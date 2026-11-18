const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const {
  openDatabase,
  upsertLead,
  saveDrafts,
  setLeadStatus,
  recordReply,
  getOutreachSteps,
  recordMeeting,
  getMeetings,
  listMeetings,
  recordActivity,
  getResearchQueue,
  getReport,
  listLeads,
  getSummary,
  exportLeadsCsv,
  canonicalizeLinkedInUrl,
  closeDatabase
} = require("./database");
const { buildLinkedInSearches } = require("./searches");

const ROOT = path.resolve(__dirname, "../..");
const HTML_PATH = path.join(ROOT, "public", "linkedin-client-engine.html");
const MAX_BODY_BYTES = 1024 * 1024;

function sendJson(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bytes = 0;
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      bytes += Buffer.byteLength(chunk);
      if (bytes > MAX_BODY_BYTES) {
        reject(new Error("Request body exceeds 1 MB"));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (_) {
        reject(new Error("Request body must be valid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function isLocalHost(hostHeader) {
  const host = String(hostHeader || "").split(":")[0].replace(/^\[|\]$/g, "").toLowerCase();
  return host === "127.0.0.1" || host === "localhost";
}

function isLocalOrigin(origin, hostHeader) {
  if (!origin) return true;
  try {
    const parsed = new URL(origin);
    return ["127.0.0.1", "localhost"].includes(parsed.hostname)
      && parsed.host.toLowerCase() === String(hostHeader || "").toLowerCase();
  } catch (_) {
    return false;
  }
}

function createAppServer(options = {}) {
  const dbPath = options.dbPath || path.join(ROOT, "state", "linkedin-client-engine.sqlite3");
  const host = options.host || "127.0.0.1";
  const port = Number.isInteger(options.port) ? options.port : 4177;
  if (host !== "127.0.0.1") throw new Error("The dashboard must bind to 127.0.0.1 only");
  const db = openDatabase(dbPath);

  const server = http.createServer(async (req, res) => {
    if (!isLocalHost(req.headers.host)) {
      sendJson(res, 403, { error: "Localhost access only" });
      return;
    }
    if (req.method === "POST" && !isLocalOrigin(req.headers.origin, req.headers.host)) {
      sendJson(res, 403, { error: "Cross-origin requests are not allowed" });
      return;
    }

    const requestUrl = new URL(req.url, "http://127.0.0.1");
    try {
      if ((req.method === "GET" || req.method === "HEAD") && requestUrl.pathname === "/") {
        const html = fs.readFileSync(HTML_PATH, "utf8");
        res.writeHead(200, {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          "x-content-type-options": "nosniff",
          "content-security-policy": "default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'"
        });
        res.end(req.method === "HEAD" ? undefined : html);
        return;
      }

      if (req.method === "GET" && requestUrl.pathname === "/api/summary") {
        sendJson(res, 200, getSummary(db));
        return;
      }
      if (req.method === "GET" && requestUrl.pathname === "/api/leads") {
        const filters = {
          status: requestUrl.searchParams.get("status") || "",
          qualification_status: requestUrl.searchParams.get("qualification_status") || "",
          limit: Number(requestUrl.searchParams.get("limit")) || 100
        };
        sendJson(res, 200, listLeads(db, filters));
        return;
      }
      if (req.method === "GET" && requestUrl.pathname === "/api/searches") {
        sendJson(res, 200, buildLinkedInSearches());
        return;
      }
      if (req.method === "GET" && requestUrl.pathname === "/api/research-queue") {
        sendJson(res, 200, getResearchQueue(db, {
          limit: Number(requestUrl.searchParams.get("limit")) || 25
        }));
        return;
      }
      if (req.method === "GET" && requestUrl.pathname === "/api/sequence") {
        const profileUrl = requestUrl.searchParams.get("linkedin_url") || "";
        sendJson(res, 200, getOutreachSteps(db, profileUrl));
        return;
      }
      if (req.method === "GET" && requestUrl.pathname === "/api/meetings") {
        const profileUrl = requestUrl.searchParams.get("linkedin_url") || "";
        if (profileUrl) {
          sendJson(res, 200, getMeetings(db, profileUrl));
        } else {
          sendJson(res, 200, listMeetings(db, {
            limit: Number(requestUrl.searchParams.get("limit")) || 50
          }));
        }
        return;
      }
      if (req.method === "GET" && requestUrl.pathname === "/api/report") {
        const end = requestUrl.searchParams.get("end") || new Date().toISOString();
        const start = requestUrl.searchParams.get("start") || new Date(Date.now() - 7 * 86400000).toISOString();
        sendJson(res, 200, getReport(db, { start, end }));
        return;
      }
      if (req.method === "GET" && requestUrl.pathname === "/api/export.csv") {
        const csv = exportLeadsCsv(db);
        res.writeHead(200, {
          "content-type": "text/csv; charset=utf-8",
          "content-disposition": 'attachment; filename="linkedin-prospects.csv"',
          "cache-control": "no-store",
          "content-length": Buffer.byteLength(csv)
        });
        res.end(csv);
        return;
      }

      if (req.method === "POST" && requestUrl.pathname === "/api/leads/import") {
        const body = await readJsonBody(req);
        const leads = Array.isArray(body) ? body : body.leads;
        if (!Array.isArray(leads)) {
          sendJson(res, 400, { error: "Expected an array of leads or an object with a leads array" });
          return;
        }
        if (leads.length > 500) {
          sendJson(res, 400, { error: "Import limit is 500 prospects per batch" });
          return;
        }
        const seen = new Set();
        const results = [];
        for (let index = 0; index < leads.length; index += 1) {
          try {
            const canonical = canonicalizeLinkedInUrl(leads[index].linkedin_url || leads[index].linkedin_profile_url);
            const existed = Boolean(db.prepare("SELECT 1 AS found FROM leads WHERE linkedin_url = ?").get(canonical));
            const duplicateInBatch = seen.has(canonical);
            seen.add(canonical);
            const saved = upsertLead(db, leads[index]);
            results.push({
              index,
              id: saved.id,
              status: saved.qualification_status,
              duplicate: existed || duplicateInBatch
            });
          } catch (error) {
            results.push({ index, error: error.message });
          }
        }
        const imported = results.filter((item) => !item.error && !item.duplicate).length;
        const duplicates = results.filter((item) => item.duplicate).length;
        const errors = results.filter((item) => item.error).length;
        sendJson(res, 200, { imported, duplicates, errors, results });
        return;
      }

      if (req.method === "POST" && requestUrl.pathname === "/api/leads") {
        const body = await readJsonBody(req);
        const saved = upsertLead(db, body);
        sendJson(res, 201, saved);
        return;
      }
      if (req.method === "POST" && requestUrl.pathname === "/api/drafts") {
        const body = await readJsonBody(req);
        const saved = saveDrafts(db, body.linkedin_url, body.drafts || {});
        sendJson(res, 200, saved);
        return;
      }
      if (req.method === "POST" && requestUrl.pathname === "/api/status") {
        const body = await readJsonBody(req);
        const saved = setLeadStatus(db, body.linkedin_url, body.status, {
          manualConfirmed: body.manual_confirmed === true,
          next_follow_up_at: body.next_follow_up_at,
          note: body.note
        });
        sendJson(res, 200, saved);
        return;
      }
      if (req.method === "POST" && requestUrl.pathname === "/api/replies") {
        const body = await readJsonBody(req);
        const saved = recordReply(db, body.linkedin_url, body.reply || {});
        sendJson(res, 200, saved);
        return;
      }
      if (req.method === "POST" && requestUrl.pathname === "/api/activity") {
        const body = await readJsonBody(req);
        const saved = recordActivity(db, body.linkedin_url, body.activity_type, body.note || "");
        sendJson(res, 200, saved);
        return;
      }
      if (req.method === "POST" && requestUrl.pathname === "/api/meetings") {
        const body = await readJsonBody(req);
        const saved = recordMeeting(db, body.linkedin_url, body.meeting || {});
        sendJson(res, 200, saved);
        return;
      }

      sendJson(res, 404, { error: "Not found" });
    } catch (error) {
      sendJson(res, 400, { error: error.message || "Request failed" });
    }
  });

  return {
    server,
    db,
    listen: () => new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(port, host, () => {
        server.removeListener("error", reject);
        resolve(server.address());
      });
    }),
    close: () => new Promise((resolve, reject) => {
      if (!server.listening) {
        closeDatabase(db);
        resolve();
        return;
      }
      server.close((error) => {
        closeDatabase(db);
        if (error) reject(error);
        else resolve();
      });
    })
  };
}

module.exports = { createAppServer };

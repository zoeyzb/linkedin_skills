const { query } = require("../server/postgres");
const { validateAction } = require("../scripts/client-engine/cloud-state");

async function snapshot() {
  const result = await query("select payload from linkedin_dashboard_state where id = $1 limit 1", ["default"]);
  return result.rows[0]?.payload || { summary: {}, leads: [], service_requests: [], replies: [], followups: [], meetings: [], searches: [] };
}

async function enqueue(actionType, payload) {
  const action = validateAction({ action_type: actionType, payload });
  const result = await query(
    "insert into linkedin_actions (action_type, payload) values ($1, $2::jsonb) returning id, action_type, payload, created_at",
    [action.action_type, JSON.stringify(action.payload)]
  );
  return result.rows[0];
}

module.exports = async function handler(request, response) {
  const parts = Array.isArray(request.query?.path) ? request.query.path : [];
  const route = "/" + parts.join("/");
  try {
    if (request.method === "GET") {
      const state = await snapshot();
      if (route === "/summary") return response.status(200).json(state.summary || {});
      if (route === "/leads") {
        let rows = Array.isArray(state.leads) ? state.leads : [];
        const status = String(request.query?.status || "").trim();
        const limit = Math.min(Math.max(Number(request.query?.limit || 100), 1), 1000);
        if (status) rows = rows.filter((row) => row.status === status);
        return response.status(200).json(rows.slice(0, limit));
      }
      if (route === "/searches") return response.status(200).json(state.searches || []);
      if (route === "/research-queue") {
        const limit = Math.min(Math.max(Number(request.query?.limit || 25), 1), 1000);
        return response.status(200).json((state.leads || []).filter((row) => row.research_status === "needs_review").slice(0, limit));
      }
      if (route === "/export.csv") {
        const rows = Array.isArray(state.leads) ? state.leads : [];
        const header = ["name","title","company","linkedin_url","score","status","qualification_status","next_follow_up_at"];
        const quote = (value) => '"' + String(value ?? "").replace(/"/g, '""') + '"';
        const csv = [header.join(","), ...rows.map((row) => header.map((key) => quote(row[key])).join(","))].join("\n");
        response.setHeader("Content-Type", "text/csv; charset=utf-8");
        response.setHeader("Content-Disposition", "attachment; filename=linkedin-prospects.csv");
        return response.status(200).send(csv);
      }
      if (route === "/report") return response.status(200).json(state.summary?.report || {});
      if (route === "/meetings") return response.status(200).json((state.meetings || []).slice(0, Math.min(Math.max(Number(request.query?.limit || 25), 1), 1000)));
      if (route === "/service-requests") {
        let rows = Array.isArray(state.service_requests) ? state.service_requests : [];
        const type = String(request.query?.request_type || "").trim();
        if (type) rows = rows.filter((row) => row.request_type === type);
        return response.status(200).json(rows.slice(0, Math.min(Math.max(Number(request.query?.limit || 25), 1), 1000)));
      }
      return response.status(404).json({ error: "Hosted API route not found" });
    }

    if (request.method === "POST") {
      if (route === "/leads") {
        const saved = await enqueue("upsert_lead", request.body || {});
        return response.status(201).json(request.body || saved);
      }
      if (route === "/leads/import") {
        const leads = Array.isArray(request.body) ? request.body : request.body?.leads;
        if (!Array.isArray(leads) || leads.length > 500) return response.status(400).json({ error: "Import must contain 1-500 leads" });
        const ids = [];
        for (const lead of leads) ids.push((await enqueue("upsert_lead", lead)).id);
        return response.status(201).json({ imported: leads.length, duplicates: 0, errors: 0, action_ids: ids });
      }
      if (route === "/drafts") {
        const body = request.body || {};
        return response.status(201).json(await enqueue("save_drafts", body));
      }
      if (route === "/status") {
        const body = request.body || {};
        const status = String(body.status || "");
        const map = {
          invitation_sent: "mark_invitation_sent",
          connected: "mark_connected",
          dm_sent: "mark_dm_sent",
          follow_up_due: "schedule_followup",
          archived: "archive"
        };
        const actionType = map[status];
        if (!actionType) return response.status(400).json({ error: "Unsupported hosted status action" });
        if (["invitation_sent", "connected", "dm_sent"].includes(status) && body.manual_confirmed !== true) {
          return response.status(400).json({ error: "Manual confirmation is required" });
        }
        const payload = { ...body, linkedin_url: body.linkedin_url, next_follow_up_at: body.next_follow_up_at };
        return response.status(201).json(await enqueue(actionType, payload));
      }
      if (route === "/activity") {
        return response.status(201).json(await enqueue("record_activity", request.body || {}));
      }
      if (route === "/replies") {
        const body = request.body || {};
        return response.status(201).json(await enqueue("record_reply", body));
      }
      if (route === "/meetings") {
        return response.status(201).json(await enqueue("record_meeting", request.body || {}));
      }
      return response.status(404).json({ error: "Hosted API route not found" });
    }

    return response.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

const MAX_SNAPSHOT_BYTES = 1_000_000;
const ACTION_TYPES = new Set([
  "copy_draft",
  "mark_invitation_sent",
  "mark_connected",
  "mark_dm_sent",
  "schedule_followup",
  "record_reply",
  "record_meeting",
  "mark_service_request_reviewed",
  "mark_service_request_responded",
  "archive",
  "upsert_lead",
  "save_drafts",
  "record_activity"
]);

function connectorStatus(lastSuccessfulSyncAt, now = new Date().toISOString(), freshnessSeconds = 180) {
  if (!lastSuccessfulSyncAt) return "offline";
  const last = new Date(lastSuccessfulSyncAt).getTime();
  const current = new Date(now).getTime();
  if (!Number.isFinite(last) || !Number.isFinite(current)) return "offline";
  return current - last <= freshnessSeconds * 1000 ? "online" : "offline";
}

function validateSyncPayload(input) {
  if (!input || typeof input !== "object" || !input.snapshot || typeof input.snapshot !== "object") {
    throw new Error("snapshot is required");
  }
  const bytes = Number.isInteger(input.bytes) ? input.bytes : Buffer.byteLength(JSON.stringify(input.snapshot), "utf8");
  if (bytes > MAX_SNAPSHOT_BYTES) throw new Error("snapshot exceeds 1 MB");
  return { snapshot: input.snapshot, bytes };
}

function validateAction(input) {
  if (!input || typeof input !== "object") throw new Error("action is required");
  const actionType = String(input.action_type || "").trim();
  if (!ACTION_TYPES.has(actionType)) throw new Error("action type is not allowed");
  if (!input.payload || typeof input.payload !== "object") throw new Error("action payload is required");
  return { action_type: actionType, payload: input.payload };
}

function buildCloudSnapshot(source, options = {}) {
  const syncedAt = options.syncedAt || new Date().toISOString();
  const leads = Array.isArray(source.leads) ? source.leads : [];
  const serviceRequests = Array.isArray(source.service_requests) ? source.service_requests : [];
  const replies = Array.isArray(source.replies) ? source.replies : [];
  const followups = Array.isArray(source.followups) ? source.followups : [];
  const meetings = Array.isArray(source.meetings) ? source.meetings : [];
  const searches = Array.isArray(source.searches) ? source.searches : [];
  return {
    version: 1,
    generated_at: syncedAt,
    connector: {
      status: "online",
      last_successful_sync_at: syncedAt,
      source: "existing-chrome-default-linkedin-bridge"
    },
    summary: source.summary || {},
    leads,
    service_requests: serviceRequests,
    replies,
    followups,
    meetings,
    searches
  };
}

function supabaseConfig(overrides = {}) {
  const url = String(overrides.url || process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const secretKey = String(overrides.secretKey || process.env.SUPABASE_SECRET_KEY || "");
  if (!url || !secretKey) throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY are required");
  return { url, secretKey };
}

async function supabaseRequest(path, options = {}, config = {}) {
  const { url, secretKey } = supabaseConfig(config);
  const response = await fetch(url + "/rest/v1/" + path, {
    ...options,
    headers: {
      apikey: secretKey,
      Authorization: "Bearer " + secretKey,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  const text = await response.text();
  let body = null;
  try { body = text ? JSON.parse(text) : null; } catch (_) { body = text; }
  if (!response.ok) throw new Error("Supabase request failed (" + response.status + "): " + (body?.message || body || "unknown error"));
  return body;
}

async function getCloudSnapshot(config = {}) {
  const rows = await supabaseRequest("linkedin_dashboard_state?select=id,payload,updated_at&id=eq.default&limit=1", {}, config);
  return rows[0] || null;
}

async function pushCloudSnapshot(snapshot, config = {}) {
  validateSyncPayload({ snapshot });
  return supabaseRequest("linkedin_dashboard_state", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({ id: "default", payload: snapshot, updated_at: snapshot.generated_at })
  }, config);
}

async function queueAction(action, config = {}) {
  const validated = validateAction(action);
  return supabaseRequest("linkedin_actions", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ action_type: validated.action_type, payload: validated.payload })
  }, config);
}

async function pullActions(afterId = 0, config = {}) {
  const safeId = Number.isInteger(afterId) ? Math.max(afterId, 0) : 0;
  return supabaseRequest("linkedin_actions?select=id,action_type,payload,created_at&applied_at=is.null&id=gt." + safeId + "&order=id.asc&limit=100", {}, config);
}

async function ackActions(ids, config = {}) {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  const clean = ids.filter((id) => Number.isInteger(id) && id > 0);
  if (!clean.length) return [];
  return supabaseRequest("linkedin_actions?id=in.(" + clean.join(",") + ")", {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ applied_at: new Date().toISOString() })
  }, config);
}

module.exports = {
  MAX_SNAPSHOT_BYTES,
  ACTION_TYPES,
  connectorStatus,
  validateSyncPayload,
  validateAction,
  buildCloudSnapshot,
  supabaseConfig,
  supabaseRequest,
  getCloudSnapshot,
  pushCloudSnapshot,
  queueAction,
  pullActions,
  ackActions
};

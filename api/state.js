const { query } = require("../server/postgres");
const { connectorStatus } = require("../scripts/client-engine/cloud-state");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed" });
  try {
    const result = await query("select payload, updated_at from linkedin_dashboard_state where id = $1 limit 1", ["default"]);
    const row = result.rows[0];
    if (!row) {
      return response.status(200).json({
        version: 1,
        generated_at: null,
        connector: { status: "offline", last_successful_sync_at: null },
        summary: {},
        leads: [],
        service_requests: [],
        replies: [],
        followups: [],
        meetings: [],
        searches: []
      });
    }
    const payload = row.payload || {};
    const now = new Date().toISOString();
    const last = payload.connector?.last_successful_sync_at || row.updated_at;
    return response.status(200).json({
      ...payload,
      connector: {
        ...(payload.connector || {}),
        status: connectorStatus(last, now, 900),
        last_successful_sync_at: last
      }
    });
  } catch (error) {
    return response.status(503).json({ error: "Dashboard data unavailable", detail: error.message });
  }
};

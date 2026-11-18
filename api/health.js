const { query } = require("../server/postgres");
const { connectorStatus } = require("../scripts/client-engine/cloud-state");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed" });
  try {
    const result = await query("select payload, updated_at from linkedin_dashboard_state where id = $1 limit 1", ["default"]);
    const row = result.rows[0];
    const last = row?.payload?.connector?.last_successful_sync_at || row?.updated_at || null;
    return response.status(200).json({
      ok: true,
      database: "online",
      connector: connectorStatus(last, new Date().toISOString(), 900),
      last_successful_sync_at: last
    });
  } catch (error) {
    return response.status(503).json({ ok: false, database: "offline", connector: "offline", error: error.message });
  }
};

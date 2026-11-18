const { query } = require("../server/postgres");
const { validateSyncPayload } = require("../scripts/client-engine/cloud-state");

module.exports = async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  try {
    const input = request.body;
    const { snapshot, bytes } = validateSyncPayload(input);
    const result = await query(
      "insert into linkedin_dashboard_state (id, payload, updated_at) values ($1, $2::jsonb, $3::timestamptz) on conflict (id) do update set payload = excluded.payload, updated_at = excluded.updated_at returning id, updated_at",
      ["default", JSON.stringify(snapshot), snapshot.generated_at || new Date().toISOString()]
    );
    return response.status(200).json({ ok: true, bytes, updated_at: result.rows[0].updated_at });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

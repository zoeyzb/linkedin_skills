const { query } = require("../server/postgres");
const { validateAction } = require("../scripts/client-engine/cloud-state");

module.exports = async function handler(request, response) {
  try {
    if (request.method === "GET") {
      const afterId = Math.max(0, Number(request.query?.after_id || 0));
      const result = await query(
        "select id, action_type, payload, created_at from linkedin_actions where applied_at is null and id > $1 order by id asc limit 100",
        [Number.isFinite(afterId) ? afterId : 0]
      );
      return response.status(200).json(result.rows);
    }

    if (request.method === "POST") {
      const action = validateAction(request.body);
      const result = await query(
        "insert into linkedin_actions (action_type, payload) values ($1, $2::jsonb) returning id, action_type, payload, created_at",
        [action.action_type, JSON.stringify(action.payload)]
      );
      return response.status(201).json(result.rows[0]);
    }

    if (request.method === "PATCH") {
      const ids = Array.isArray(request.body?.ids) ? request.body.ids.map(Number).filter((id) => Number.isInteger(id) && id > 0) : [];
      if (!ids.length) return response.status(400).json({ error: "ids are required" });
      const result = await query(
        "update linkedin_actions set applied_at = now() where id = any($1::bigint[]) returning id",
        [ids]
      );
      return response.status(200).json({ applied: result.rows.map((row) => row.id) });
    }

    return response.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

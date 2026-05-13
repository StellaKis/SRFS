const pool = require("../db");

const otkazi = async (id) => {
  const result = await pool.query(`
    UPDATE rezervacija
    SET status = 'otkazana'
    WHERE rezervacija_id = $1
    RETURNING *
  `, [id]);
  return result.rows[0];
};

module.exports = { otkazi };
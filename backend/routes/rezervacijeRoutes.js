const express = require("express");
const router = express.Router();
const pool = require("../db");

router.put("/:id/otkazi", async (req, res) => {
  const { id } = req.params;

  try {

    const result = await pool.query(`
      UPDATE rezervacija
      SET status = 'otkazana'
      WHERE rezervacija_id = $1
      RETURNING *
    `, [id]);

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
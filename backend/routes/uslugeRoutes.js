const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM usluga ORDER BY usluga_id"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Greška servera");
  }
});

router.post("/", async (req, res) => {
  try {
    const { naziv, trajanje, cijena } = req.body;

    if (trajanje < 10 || trajanje > 240) {
      return res.status(400).json({ error: "Trajanje ne smije biti manje od 10 minuta" });
    }

    if (cijena <= 0) {
      return res.status(400).json({ error: "Cijena ne smije biti nula ili manja od nule" });
    }

    const result = await pool.query(
      "INSERT INTO usluga (naziv, trajanje, cijena) VALUES ($1, $2, $3) RETURNING *",
      [naziv, trajanje, cijena]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Greška servera");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { naziv, trajanje, cijena } = req.body;

    if (trajanje < 10 || trajanje > 240) {
      return res.status(400).json({ error: "Trajanje ne smije biti manje od 10 minuta" });
    }

    if (cijena <= 0) {
      return res.status(400).json({ error: "Cijena ne smije biti nula ili manja od nule" });
    }

    const result = await pool.query(
      "UPDATE usluga SET naziv=$1, trajanje=$2, cijena=$3 WHERE usluga_id=$4 RETURNING *",
      [naziv, trajanje, cijena, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Greška servera");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM usluga WHERE usluga_id=$1", [id]);

    res.json({ message: "Usluga obrisana" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Greška servera");
  }
});

module.exports = router;
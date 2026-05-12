const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {

    const result = await pool.query(`
      SELECT 
        k.korisnik_id,
        ko.ime,
        ko.prezime,
        ko.email,
        ko.telefon
      FROM klijent k
      JOIN korisnik ko 
        ON k.korisnik_id = ko.korisnik_id
      WHERE k.korisnik_id = $1
    `, [id]);

    // ako ne postoji klijent
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Klijent nije pronađen"
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.get("/:id/rezervacije", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        r.rezervacija_id,
        r.datum_rezervacije,
        r.pocetak,
        r.kraj,
        r.status,
        r.napomena,
        u.naziv AS usluga,
        u.trajanje,
        u.cijena,
        kz.ime || ' ' || kz.prezime AS zaposlenik
      FROM rezervacija r
      JOIN usluga u ON r.usluga_id = u.usluga_id

      -- zaposlenik preko korisnik tablice
      JOIN zaposlenik z ON r.zaposlenik_id = z.korisnik_id
      JOIN korisnik kz ON z.korisnik_id = kz.korisnik_id

      WHERE r.klijent_id = $1
      ORDER BY r.datum_rezervacije DESC
    `, [id]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


module.exports = router;
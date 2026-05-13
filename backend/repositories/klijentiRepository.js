const pool = require("../db");

const getById = async (id) => {
  const result = await pool.query(`
    SELECT k.korisnik_id, ko.ime, ko.prezime, ko.email, ko.telefon
    FROM klijent k
    JOIN korisnik ko ON k.korisnik_id = ko.korisnik_id
    WHERE k.korisnik_id = $1
  `, [id]);
  return result.rows[0];
};

const getRezervacijeByKlijentId = async (id) => {
  const result = await pool.query(`
    SELECT 
      r.rezervacija_id, r.datum_rezervacije, r.pocetak, r.kraj,
      r.status, r.napomena,
      u.naziv AS usluga, u.trajanje, u.cijena,
      kz.ime || ' ' || kz.prezime AS zaposlenik
    FROM rezervacija r
    JOIN usluga u ON r.usluga_id = u.usluga_id
    JOIN zaposlenik z ON r.zaposlenik_id = z.korisnik_id
    JOIN korisnik kz ON z.korisnik_id = kz.korisnik_id
    WHERE r.klijent_id = $1
    ORDER BY r.datum_rezervacije DESC
  `, [id]);
  return result.rows;
};

module.exports = { getById, getRezervacijeByKlijentId };
const pool = require("../db");

const getAll = async () => {
  const result = await pool.query(
    "SELECT * FROM usluga ORDER BY usluga_id"
  );
  return result.rows;
};

const create = async (naziv, trajanje, cijena) => {
  const result = await pool.query(
    "INSERT INTO usluga (naziv, trajanje, cijena) VALUES ($1, $2, $3) RETURNING *",
    [naziv, trajanje, cijena]
  );
  return result.rows[0];
};

const update = async (id, naziv, trajanje, cijena) => {
  const result = await pool.query(
    "UPDATE usluga SET naziv=$1, trajanje=$2, cijena=$3 WHERE usluga_id=$4 RETURNING *",
    [naziv, trajanje, cijena, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query("DELETE FROM usluga WHERE usluga_id=$1", [id]);
};

module.exports = { getAll, create, update, remove };
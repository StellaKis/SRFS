const rezervacijeRepository = require("../repositories/rezervacijeRepository");

const otkazi = async (id) => {
  const rezervacija = await rezervacijeRepository.otkazi(id);
  if (!rezervacija) {
    throw new Error("Rezervacija nije pronađena");
  }
  return rezervacija;
};

module.exports = { otkazi };
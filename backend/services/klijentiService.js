const klijentiRepository = require("../repositories/klijentiRepository");

const getById = async (id) => {
  const klijent = await klijentiRepository.getById(id);
  if (!klijent) {
    throw new Error("Klijent nije pronađen");
  }
  return klijent;
};

const getRezervacije = async (id) => {
  return await klijentiRepository.getRezervacijeByKlijentId(id);
};

module.exports = { getById, getRezervacije };
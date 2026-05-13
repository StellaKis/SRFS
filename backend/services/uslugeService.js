const uslugeRepository = require("../repositories/uslugeRepository");

const getAll = async () => {
  return await uslugeRepository.getAll();
};

const create = async (naziv, trajanje, cijena) => {
  if (trajanje < 10 || trajanje > 240) {
    throw new Error("Trajanje ne smije biti manje od 10 minuta");
  }
  if (cijena <= 0) {
    throw new Error("Cijena ne smije biti nula ili manja od nule");
  }
  return await uslugeRepository.create(naziv, trajanje, cijena);
};

const update = async (id, naziv, trajanje, cijena) => {
  if (trajanje < 10 || trajanje > 240) {
    throw new Error("Trajanje ne smije biti manje od 10 minuta");
  }
  if (cijena <= 0) {
    throw new Error("Cijena ne smije biti nula ili manja od nule");
  }
  return await uslugeRepository.update(id, naziv, trajanje, cijena);
};

const remove = async (id) => {
  return await uslugeRepository.remove(id);
};

module.exports = { getAll, create, update, remove };
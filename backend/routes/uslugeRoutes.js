const express = require("express");
const router = express.Router();
const uslugeService = require("../services/uslugeService");

router.get("/", async (req, res) => {
  try {
    const result = await uslugeService.getAll();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Greška servera");
  }
});

router.post("/", async (req, res) => {
  try {
    const { naziv, trajanje, cijena } = req.body;

    const result = await uslugeService.create(naziv, trajanje, cijena);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Greška servera");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { naziv, trajanje, cijena } = req.body;

    const result = await uslugeService.update(id, naziv, trajanje, cijena);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Greška servera");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await uslugeService.remove(id);

    res.json({ message: "Usluga obrisana" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Greška servera");
  }
});

module.exports = router;
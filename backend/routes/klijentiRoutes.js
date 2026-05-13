const express = require("express");
const router = express.Router();
const klijentiService = require("../services/klijentiService");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const klijent = await klijentiService.getById(id);
    res.json(klijent);
  } catch (err) {
    if (err.message === "Klijent nije pronađen") {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).send(err.message);
  }
});

router.get("/:id/rezervacije", async (req, res) => {
  const { id } = req.params;

  try {
    const rezervacije = await klijentiService.getRezervacije(id);
    res.json(rezervacije);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


module.exports = router;
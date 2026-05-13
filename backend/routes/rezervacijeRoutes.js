const express = require("express");
const router = express.Router();
const rezervacijeService = require("../services/rezervacijeService");

router.put("/:id/otkazi", async (req, res) => {
  const { id } = req.params;

  try {

    const result = await rezervacijeService.otkazi(id);

    res.json(result);

  } catch (err) {
    if (err.message === "Rezervacija nije pronađena") {
      return res.status(404).json({ error: err.message });
    }
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usluge", require("./routes/uslugeRoutes"));
app.use("/api/klijenti", require("./routes/klijentiRoutes"));
app.use("/api/rezervacije", require("./routes/rezervacijeRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
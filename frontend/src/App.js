import { useState } from "react";
import "./App.css";

import SifrarnikUsluga from "./SifrarnikUsluga";
import KlijentRezervacije from "./KlijentiMasterDetail";

function App() {
  const [screen, setScreen] = useState("sifrarnik");

  return (
    <div className="app">

      {/* NAVIGACIJA */}
      <div className="nav">
        <button
          onClick={() => setScreen("sifrarnik")}
          className={screen === "sifrarnik" ? "active" : ""}
        >
          Šifrarnik usluga
        </button>

        <button
          onClick={() => setScreen("master")}
          className={screen === "master" ? "active" : ""}
        >
          Master Detail
        </button>
      </div>

      {/* EKRANI */}
      <div className="content">
        {screen === "sifrarnik" && <SifrarnikUsluga />}

        {screen === "master" && <KlijentRezervacije />}
      </div>

    </div>
  );
}

export default App;
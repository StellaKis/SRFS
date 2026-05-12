import { useEffect, useState } from "react";
import axios from "axios";
import "./SifrarnikUsluga.css";

function SifrarnikUsluga() {
  const [usluge, setUsluge] = useState([]);
  const [pretraga, setPretraga] = useState("");

  useEffect(() => {
    dohvatiUsluge();
  }, []);

  const [editId, setEditId] = useState(null);
  const [forma, setForma] = useState({
    naziv: "",
    trajanje: "",
    cijena: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dohvatiUsluge = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/usluge"
      );

      setUsluge(response.data);
    } catch (error) {
      console.error("Greška:", error);
    }
  };
  
  const spremi = async () => {
    try {
            setError("");
            setSuccess("");

            if (editId) {
            await axios.put(`http://localhost:5000/api/usluge/${editId}`, forma);
            setSuccess("Usluga uspješno ažurirana");
            } else {
            await axios.post("http://localhost:5000/api/usluge", forma);
            setSuccess("Usluga uspješno dodana");
            }

            setForma({ naziv: "", trajanje: "", cijena: "" });
            setEditId(null);
            dohvatiUsluge();

        } catch (err) {
            setSuccess("");

            setError(err.response?.data?.error || "Greška prilikom spremanja");
    }
  };

  const uredi = (u) => {
    setEditId(u.usluga_id);
    setForma({
        naziv: u.naziv,
        trajanje: u.trajanje,
        cijena: u.cijena
    });
  };

  const obrisi = async (id) => {
    await axios.delete(`http://localhost:5000/api/usluge/${id}`);
    dohvatiUsluge();
  };

  const filtriraneUsluge = usluge.filter((u) =>
    u.naziv.toLowerCase().includes(pretraga.toLowerCase())
  );

  return (
  <div className="container">

    <h1>Šifrarnik usluga</h1>

    <div className="form-box">
      <h3>{editId ? "Uredi uslugu" : "Dodavanje usluge"}</h3>

      <input
        placeholder="Naziv"
        value={forma.naziv}
        onChange={(e) =>
          setForma({ ...forma, naziv: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Trajanje (min)"
        value={forma.trajanje}
        onChange={(e) =>
          setForma({ ...forma, trajanje: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Cijena (€)"
        value={forma.cijena}
        onChange={(e) =>
          setForma({ ...forma, cijena: e.target.value })
        }
      />

      <button onClick={spremi}>
        {editId ? "Ažuriraj" : "Dodaj"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
            {error}
        </p>
      )}

      {success && (
        <p style={{ color: "green", marginTop: "10px" }}>
            {success}
        </p>
        )}
    </div>

    <div className="search-box">
      <h3>Pretraživanje</h3>

      <input
        type="text"
        placeholder="Pretraži uslugu..."
        value={pretraga}
        onChange={(e) => setPretraga(e.target.value)}
      />

      <button onClick={dohvatiUsluge}>
        Osvježi
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Naziv</th>
          <th>Trajanje</th>
          <th>Cijena</th>
          <th>Akcije</th>
        </tr>
      </thead>

      <tbody>
        {filtriraneUsluge.map((usluga) => (
          <tr key={usluga.usluga_id}>
            <td>{usluga.naziv}</td>
            <td>{usluga.trajanje} min</td>
            <td>{usluga.cijena} €</td>
            <td>
              <button className="edit-btn" onClick={() => uredi(usluga)}>
                Uredi
              </button>

              <button className="delete-btn" onClick={() => obrisi(usluga.usluga_id)}>
                Obriši
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
);
}

export default SifrarnikUsluga;
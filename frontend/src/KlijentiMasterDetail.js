import { useEffect, useState } from "react";
import axios from "axios";
import "./MasterDetail.css";

function KlijentRezervacije() {
    const [klijent, setKlijent] = useState(null);

    const [rezervacije, setRezervacije] = useState([]);

    const [odabranaRezervacija, setOdabranaRezervacija] = useState(null);

    // hardkodirani klijent_id = 3
    const klijentId = 3;

    useEffect(() => {
        dohvatiRezervacije();
    }, []);

    const dohvatiRezervacije = async () => {
        try {
        
            const klijentRes = await axios.get(`http://localhost:5000/api/klijenti/${klijentId}`);
            
            setKlijent(klijentRes.data);

            const res = await axios.get( `http://localhost:5000/api/klijenti/${klijentId}/rezervacije`);

            setRezervacije(res.data);
            
            setOdabranaRezervacija(null);

        } catch (err) {
            console.error(err);
        }
    };

    const otkaziRezervaciju = async () => {
        try {

            const res =await axios.put(`http://localhost:5000/api/rezervacije/${odabranaRezervacija.rezervacija_id}/otkazi`);

            const noviStatus = res.data.status;

    // ✅ update samo status u detailu
    setOdabranaRezervacija((prev) => ({
      ...prev,
      status: noviStatus
    }));

    // ✅ update liste lijevo
    setRezervacije((prev) =>
      prev.map((r) =>
        r.rezervacija_id === odabranaRezervacija.rezervacija_id
          ? { ...r, status: noviStatus }
          : r
      )
    );

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="md-container">

        <h1>Master–Detail: Pregled rezervacija</h1>

        <div className="md-layout">

            <div className="master">
            <h2>
                {klijent ? `${klijent.ime} ${klijent.prezime}` : "Klijent"}
            </h2>

            <h2>Rezervacije</h2>

            {rezervacije.length === 0 && (
                <p>Nema rezervacija</p>
            )}

            {rezervacije.map((r) => (
                <div
                key={r.rezervacija_id}
                className={`rezervacija ${
                    odabranaRezervacija?.rezervacija_id === r.rezervacija_id
                    ? "active"
                    : ""
                }`}
                onClick={() => setOdabranaRezervacija(r)}
                >

                <b>
                    {new Date(r.datum_rezervacije).toLocaleDateString()}
                </b>

                <div>
                    {new Date(r.pocetak).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                    })}
                </div>

                </div>
            ))}

            </div>

            <div className="detail">

            <h2>Detalji rezervacije</h2>

            {!odabranaRezervacija && (
                <p>Odaberi rezervaciju</p>
            )}

            {odabranaRezervacija && (
                <div className="detail-card">

                <p>
                    <b>Datum rezervacije:</b><br />
                    {new Date(
                    odabranaRezervacija.datum_rezervacije
                    ).toLocaleDateString()}
                </p>

                <p>
                    <b>Vrijeme:</b><br />
                    {new Date(
                    odabranaRezervacija.pocetak
                    ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                    })} - {new Date(
                    odabranaRezervacija.kraj
                    ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                    })}
                </p>

                <p>
                    <b>Trajanje:</b><br />
                    {odabranaRezervacija.trajanje} min
                </p>

                <p>
                    <b>Usluga:</b><br />
                    {odabranaRezervacija.usluga}
                </p>

                <p>
                    <b>Cijena:</b><br />
                    {odabranaRezervacija.cijena} €
                </p>

                <p>
                    <b>Zaposlenik:</b><br />
                    {odabranaRezervacija.zaposlenik}
                </p>

                <p>
                    <b>Status:</b><br />
                    {odabranaRezervacija.status}
                </p>
                <p>
                    <b>Napomena:</b><br />
                    {odabranaRezervacija.napomena || "Nema napomene"}
                </p>

                {odabranaRezervacija.status === "aktivna" && (
                    <button
                        className="cancel-btn"
                        onClick={otkaziRezervaciju}
                    >
                        Otkaži rezervaciju
                    </button>
                )}

                </div>
            )}

            </div>

        </div>
        </div>
    );
}

export default KlijentRezervacije;
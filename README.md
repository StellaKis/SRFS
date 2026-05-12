# Sustav za rezervaciju termina u frizerskom salonu (SRFS)

Web aplikacija za upravljanje frizerskim uslugama i rezervacijama termina.  
Projekt je izrađen kao dio informacijskog sustava i demonstrira CRUD operacije, master-detail prikaz te rad s relacijskom bazom podataka.

---

## Arhitektura sustava

- **Frontend:** React 
- **Backend:** Node.js + Express
- **Baza podataka:** PostgreSQL

---

## Funkcionalnosti

### Šifrarnik usluga
- Dodavanje novih usluga
- Uređivanje postojećih usluga
- Brisanje usluga
- Pretraživanje usluga
- Validacija cijene i trajanja

---

### Master–Detail (Pregled rezervacija)
- Prikaz rezervacija po odabranom klijentu
- Detalji rezervacije:
  - datum i vrijeme
  - usluga
  - trajanje i cijena
  - zaposlenik koji će izvršiti uslugu
  - status i napomena
- Otkazivanje rezervacije

---

## Instalacija i pokretanje

### Kloniranje repozitorija
```bash
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME
```

## Backend setup (Node.js + Express + PostgreSQL)

```bash
cd backend
npm install
```

### Pokretanje servera: 
```bash
node server.js
```

### Konfiguracija baze podataka

U datoteci db.js podesiti PostgreSQL connection:
```bash
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "YOUR_PASSWORD",
  host: "localhost",
  port: 5432,
  database: "frizerski_salon"
});
```

module.exports = pool;

## Frontend setup (React)

```bash
cd frontend
npm install
```

### Pokretanje aplikacije:
```bash 
npm start
```
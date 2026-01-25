const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();

app.use(express.json());

// Create/open database
const db = new sqlite3.Database("./icecream.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS flavors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  flavor TEXT NOT NULL
)`);

// GET /icecream - list all flavors
app.get("/icecream", (req, res) => {
  db.all("SELECT * FROM flavors", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST /icecream - add a new flavor
app.post("/icecream", (req, res) => {
  const { flavor } = req.body;
  if (!flavor) {
    return res.status(400).json({ error: "Flavor is required" });
  }
  db.run("INSERT INTO flavors (flavor) VALUES (?)", [flavor], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, flavor });
  });
});

// PUT /icecream/:id - edit a flavor
app.put("/icecream/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { flavor } = req.body;
  if (!flavor) {
    return res.status(400).json({ error: "Flavor is required" });
  }
  db.run(
    "UPDATE flavors SET flavor = ? WHERE id = ?",
    [flavor, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Flavor not found" });
      }
      res.json({ id, flavor });
    },
  );
});

// DELETE /icecream/:id - delete a flavor
app.delete("/icecream/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.run("DELETE FROM flavors WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Flavor not found" });
    }
    res.status(204).send();
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 4000;

app.use(express.json());

// Create a connection to the SQLite database
const db = new sqlite3.Database("./database/greetings.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Greetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timeOfDay TEXT,
        language TEXT,
        greetingMessage TEXT,
        tone TEXT
    )`);

  const stmt = db.prepare(
    `INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone) VALUES (?, ?, ?, ?)`
  );
  const seedData = [
    // Morning Formal
    ["Morning", "English", "Good Morning", "Formal"],
    ["Morning", "French", "Bonjour", "Formal"],
    ["Morning", "Spanish", "Buenos Días", "Formal"],
    // Morning Casual
    ["Morning", "English", "Morning", "Casual"],
    ["Morning", "French", "Salut", "Casual"],
    ["Morning", "Spanish", "Hola, buenos días", "Casual"],

    // Afternoon Formal
    ["Afternoon", "English", "Good Afternoon", "Formal"],
    ["Afternoon", "French", "Bon Après-midi", "Formal"],
    ["Afternoon", "Spanish", "Buenas Tardes", "Formal"],
    // Afternoon Casual
    ["Afternoon", "English", "Afternoon", "Casual"],
    ["Afternoon", "French", "Salut, après-midi", "Casual"],
    ["Afternoon", "Spanish", "Hola, buenas tardes", "Casual"],

    // Evening Formal
    ["Evening", "English", "Good Evening", "Formal"],
    ["Evening", "French", "Bonsoir", "Formal"],
    ["Evening", "Spanish", "Buenas Noches", "Formal"],
    // Evening Casual
    ["Evening", "English", "Evening", "Casual"],
    ["Evening", "French", "Salut, soirée", "Casual"],
    ["Evening", "Spanish", "Hola, buenas noches", "Casual"],
  ];

  seedData.forEach((data) => stmt.run(data));
  stmt.finalize();
});

// Greet Endpoint
app.post("/api/greetings/greet", (req, res) => {
  // Log the incoming request body
  console.log("Received request body:", req.body);

  const { timeOfDay, language, tone } = req.body;

  // Log each value to ensure they are being passed correctly
  console.log(`timeOfDay: ${timeOfDay}, language: ${language}, tone: ${tone}`);

  // Query the database for the greeting message
  db.get(
    `SELECT greetingMessage FROM Greetings WHERE timeOfDay = ? AND language = ? AND tone = ?`,
    [timeOfDay, language, tone],
    (err, row) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Database error" });
      } else if (row) {
        console.log("Greeting found:", row);
        res.json({ greetingMessage: row.greetingMessage });
      } else {
        console.warn("Greeting not found for provided parameters.");
        res.status(404).json({ error: "Greeting not found" });
      }
    }
  );
});

// Get All Times of Day Endpoint
app.get("/api/greetings/timesofday", (req, res) => {
  db.all(`SELECT DISTINCT timeOfDay FROM Greetings`, [], (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      console.log("Times of day found:", rows);
      res.json(rows.map((row) => row.timeOfDay));
    }
  });
});

// Get Supported Languages Endpoint
app.get("/api/greetings/languages", (req, res) => {
  db.all(`SELECT DISTINCT language FROM Greetings`, [], (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      console.log("Languages found:", rows);
      res.json(rows.map((row) => row.language));
    }
  });
});

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Greetings API! Use /api/greetings/greet to get started."
  );
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

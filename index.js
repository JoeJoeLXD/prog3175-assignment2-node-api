//Program ID: PROG3210-24F-Sec2
//Purpose: Assignment 2
//Part I: Develop a Simple Web API with SQLite in Node.js
//Created Nov 15 2024 by Xiangdong Li

//Program ID: PROG3210-24F-Sec2
//Purpose: Assignment 3
//Part II: Deploy Your API on Vercel
//Created Nov 22 2024 by Xiangdong Li

const express = require("express");
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 4000;

// Determine base URL for API depending on the environment
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://prog3175-assignment2-node-api.vercel.app"
    : `http://localhost:${port}`;

console.log(`Base URL is set to: ${baseUrl}`);

// Copy the database file to a writable location, e.g., `/tmp`
const sourcePath = path.join(__dirname, "database", "greetings.db");
const writablePath =
  process.env.NODE_ENV === "production" ? "/tmp/greetings.db" : sourcePath;

if (process.env.NODE_ENV === "production") {
  fs.copyFileSync(sourcePath, writablePath);
}

// Use the database from the writable path
const db = new sqlite3.Database(writablePath, (err) => {
  if (err) {
    console.error("Could not open database", err);
  } else {
    console.log("Connected to the SQLite database");
  }
});

app.use(express.json());

// Enhance the root endpoint to serve an HTML welcome page
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greetings API - Welcome</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
            line-height: 1.6;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
            background-color: #fff;
        }
        h1 {
            color: #5a67d8;
        }
        .endpoint {
            margin-top: 20px;
        }
        .endpoint a {
            color: #3182ce;
            text-decoration: none;
            font-weight: bold;
        }
        .endpoint a:hover {
            text-decoration: underline;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #3182ce;
            color: #ffffff !important; /* Ensure text color is always white */
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s, color 0.3s;
            font-weight: bold; /* Makes text bold for better visibility */
            border: none;
            font-size: 16px; /* Set a reasonable font size */
        }
        .btn:hover {
            background-color: #225ea8;
            color: #ffffff !important; /* Maintain white color on hover */
        }
        footer {
            margin-top: 40px;
            font-size: 0.9em;
            color: #555;
        }
    </style>
</head>
<body>
    <h1>Welcome to the Greetings API!</h1>
    <p>
        This is a simple web API that provides customized greeting messages based on the time of day, language, and tone. Use the endpoints described below to interact with the API.
    </p>
    <h2>Available Endpoints</h2>
    <div class="endpoint">
        <h3>Get a Greeting</h3>
        <p>Endpoint: <code>POST ${baseUrl}/api/greetings/greet</code></p>
        <p>Description: Fetch a greeting message by specifying the time of day, language, and tone.</p>
        <p>Example Request Body:</p>
        <pre>{
    "timeOfDay": "Morning",
    "language": "French",
    "tone": "Casual",
    "greetingMessage": "Salut"
}</pre>
        <p>To use this endpoint, send a POST request with the specified parameters. You can use tools like Postman or a simple JavaScript fetch request to test it.</p>
    </div>
    <div class="endpoint">
        <h3>Get All Times of Day</h3>
        <p>Endpoint: <code>GET ${baseUrl}/api/greetings/timesofday</code></p>
        <p>Description: Returns a list of all available times of day.</p>
        <a class="btn" href="${baseUrl}/api/greetings/timesofday" target="_blank">View Times of Day</a>
    </div>
    <div class="endpoint">
        <h3>Get Supported Languages</h3>
        <p>Endpoint: <code>GET ${baseUrl}/api/greetings/languages</code></p>
        <p>Description: Returns a list of all supported languages for greetings.</p>
        <a class="btn" href="${baseUrl}/api/greetings/languages" target="_blank">View Languages</a>
    </div>
    <div class="endpoint">
        <h3>Get Supported Tones</h3>
        <p>Endpoint: <code>GET ${baseUrl}/api/greetings/tones</code></p>
        <p>Description: Returns a list of all supported tones (e.g., Formal, Casual) for greetings.</p>
        <a class="btn" href="${baseUrl}/api/greetings/tones" target="_blank">View Tones</a>
    </div>
    <footer>
        <p>
            Created as part of PROG3210-24F-Sec2, Assignment 2 & 3 for Conestoga College. Developed by Xiangdong Li.<br>
            Contact: <a href="mailto:xli3963@conestogac.on.ca">xli3963@conestogac.on.ca</a>
        </p>
    </footer>
</body>
</html>
  `);
});

// Greet Endpoint with Validation and Enhanced Response
app.post("/api/greetings/greet", (req, res) => {
  console.log("Received request body:", req.body);

  const { timeOfDay, language, tone } = req.body;

  // Input validation
  const validTimesOfDay = ["Morning", "Afternoon", "Evening"];
  const validLanguages = ["English", "French", "Spanish"];
  const validTones = ["Formal", "Casual"];

  if (
    !validTimesOfDay.includes(timeOfDay) ||
    !validLanguages.includes(language) ||
    !validTones.includes(tone)
  ) {
    return res.status(400).json({ error: "Invalid input parameters" });
  }

  db.get(
    `SELECT greetingMessage FROM Greetings WHERE timeOfDay = ? AND language = ? AND tone = ?`,
    [timeOfDay, language, tone],
    (err, row) => {
      if (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Database error" });
      } else if (row) {
        res.json({
          timeOfDay,
          language,
          tone,
          greetingMessage: row.greetingMessage,
        });
      } else {
        res
          .status(404)
          .json({
            error: `Greeting not found for timeOfDay: ${timeOfDay}, language: ${language}, tone: ${tone}`,
          });
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
      res.json(rows.map((row) => row.language));
    }
  });
});

// Get Supported Tones Endpoint
app.get("/api/greetings/tones", (req, res) => {
  const tones = ["Formal", "Casual"];
  res.json(tones);
});

// Start the Server (only if not in production)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on ${baseUrl}`);
  });
}

module.exports = app;

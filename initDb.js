const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/greetings.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Greetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timeOfDay TEXT,
        language TEXT,
        greetingMessage TEXT,
        tone TEXT
    )`);

    const stmt = db.prepare(`INSERT INTO Greetings (timeOfDay, language, greetingMessage, tone) VALUES (?, ?, ?, ?)`);
    const seedData = [
        ["Morning", "English", "Good Morning", "Formal"],
        ["Morning", "French", "Bonjour", "Formal"],
        ["Morning", "Spanish", "Buenos Días", "Formal"],
        ["Afternoon", "English", "Good Afternoon", "Formal"],
        ["Afternoon", "French", "Bon Après-midi", "Formal"],
        ["Evening", "Spanish", "Buenas Noches", "Formal"],
        ["Evening", "English", "Good Evening", "Casual"],
        ["Evening", "French", "Bonsoir", "Casual"]
    ];

    seedData.forEach(data => stmt.run(data));
    stmt.finalize();
});

db.close();

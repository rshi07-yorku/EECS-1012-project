// node.js backend for the diary project

const http = require("http");
const fs = require("fs");
const PORT = 3000;
const DATA_FILE = "./database.json";

// Helper: read the JSON "database"
function readDatabase() {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

// Helper: save the JSON "database"
function writeDatabase(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Helper: send JSON response
function sendJson(res, statusCode, obj) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Allow JSON from browser
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests (browser stuff for POST)
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // 1) Health check
  if (req.url === "/ping" && req.method === "GET") {
    return sendJson(res, 200, { message: "Diary server is alive!" });
  }

  // 2) Login endpoint
  if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      const { username, password } = JSON.parse(body);
      const db = readDatabase();
      const user = db.users.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        return sendJson(res, 200, { success: true });
      } else {
        return sendJson(res, 401, { success: false, error: "Invalid login" });
      }
    });
    return;
  }

  // 3) Get all diary entries
  if (req.url === "/entries" && req.method === "GET") {
    const db = readDatabase();
    return sendJson(res, 200, db.entries);
  }

  // 4) Create a new diary entry
  if (req.url === "/entries" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      const { title, text } = JSON.parse(body);
      const db = readDatabase();
      const newEntry = {
        id: Date.now(),
        title,
        text,
        wordCount: text.trim().split(/\s+/).filter(Boolean).length,
        timestamp: new Date().toISOString()
      };
      db.entries.push(newEntry);
      writeDatabase(db);
      return sendJson(res, 201, newEntry);
    });
    return;
  }

  // If nothing matched → 404
  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Diary server is running on http://localhost:${PORT}`);
});

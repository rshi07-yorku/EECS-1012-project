// packages
const express = require('express'); // server
const path = require('path'); // server
const fs = require('fs'); // files
const app = express();
const session = require('express-session'); // cookies for login
const users = JSON.parse(fs.readFileSync('./database.json'));
const fsPromises=fs.promises;

// enabling packages
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // server setup, hosted on localhost

// express login thing
app.use(session({
    secret: "keytobereplacedlateridfk",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // not https
}));

// login (mostly gpt)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users[username];
    if (!user || user.password !== password) {
        console.log("POST /api/login failed: " + username + " " + password);
        return res.status(400).json({ error: "Invalid username or password" });
    }
    req.session.username = username;
    res.json({ message: "Logged in", username });
    console.log("POST /api/login: " + username + " logged in");
});

// check user (mostly gpt, should be a try/catch but lazy)
app.get('/api/me', (req, res) => {
    if (!req.session.username) return res.status(401).json({ loggedIn: false });
    console.log("POST /api/me: " + req.session.username + " check login");
    res.json({ loggedIn: true, username: req.session.username });
});

// logout
app.post('/api/logout', (req, res) => {
    console.log("POST /api/logout: " + req.session.username + " logged out");
    req.session.destroy(() => {
        res.json({ message: "Logged out" });
    });
});

// for /signup
// signup
app.post('/api/signup', async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    const user = users[username];

    if (user) {
        return res.status(400).json({ error: "Username already in use" });
    }

    // Add the new user
    users[username] = { password };

    // Save to database.json
    fs.writeFileSync('./database.json', JSON.stringify(users, null, 2));

    // Log in the new user
    req.session.username = username;

    res.json({ message: "Signup successful", username });
});


// for /index
// get diary entries
app.get('/api/listentries', async (req, res) => {
    try {
        const username = req.session.username;
        if (!username) {
            return res.status(401).json({ success: false, error: "Not logged in" });
        }

        const userDir = path.join(__dirname, 'entries', username);
        console.log("Getting diaries from:", userDir);

        // Read directory
        const files = await fsPromises.readdir(userDir);
        console.log("Found files:", files);

        // Filter only files (not directories)
        const fileList = [];
        for (let file of files) {
            const filePath = path.join(userDir, file);
            const stat = await fsPromises.stat(filePath);
            if (stat.isFile()) {
                file=file.slice(0,-3);
                fileList.push(file);
            }
        }

        console.log("Filtered file list:", fileList);
        res.json({ success: true, files: fileList });

    } catch (err) {
        console.error('Error reading entries:', err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// for /edit
// get specified entry
app.get('/api/getentry', async (req, res) => {
    try {
        const title = req.query.title + ".md";
        const username = req.session.username;
        if (!username) {
            return res.status(401).json({ success: false, error: "Not logged in" });
        }

        const entry = path.join(__dirname, 'entries', username, title);
        console.log("Getting entry from:", entry);

        // Check if folder exists
        try {
            const output = await fsPromises.readFile(entry, 'utf-8');
            res.json({ success: true, output });
        } catch (err) {
            if (err.code === 'ENOENT') {
                return res.json({ success: true, output: "" });
            }
            throw err; // Other errors
        }
    } catch (err) {
        console.error('Error reading entries:', err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// save edits
app.post('/api/save', (req, res) => {
    const username = req.session.username;
    if (!username) return res.status(401).json({ success: false, error: "Not logged in" });

    const { filename, content } = req.body;
    const userDir = path.join(__dirname, 'entries', username);

    // Ensure the directory exists
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

    fs.writeFile(path.join(userDir, filename), content, err => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.json({ success: true });
    });
});



app.listen(3000, (error) => {
    if (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
    console.log('Server running on port 3000');
});
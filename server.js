// packages
const express = require('express'); // server
const path = require('path'); // server
const fs = require('fs'); // files
const app = express(); 
const session = require('express-session'); // cookies for login

const users = JSON.parse(fs.readFileSync('./database.json'));

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
        return res.status(400).json({ error: "Invalid username or password" });
    }
    req.session.username = username;
    res.json({ message: "Logged in", username });
});

// check user (mostly gpt, should be a try/catch but lazy)
app.get('/api/me', (req, res) => {
    if (!req.session.username) return res.status(401).json({ loggedIn: false });
    res.json({ loggedIn: true, username: req.session.username });
});

// logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out" });
    });
});

// for /signup
// signup
app.post('/api/signup-server', async (req, res) => {
    const { username, password } = req.body;

    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(400).json({ error: "Invalid username or password" });
    }
    req.session.username = username;
    res.json({ message: "Logged in", username });
});


// for /index
// get diary entries
app.post('/api/entries', (req, res) => {
    const username = req.session.username;
    if (!username) return res.status(401).json({ success: false, error: "Not logged in" });

    const userDir = path.join(__dirname, 'entries', username);
    // Check if folder exists
    if (!fs.existsSync(userDir)) {
        return res.json({ success: true, files: [] });
    }

    fs.readdir(userDir, (err, files) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }

        // Optionally filter only files
        const fileList = files.filter(file => fs.statSync(path.join(userDir, file)).isFile());

        res.json({ success: true, files: fileList });
    });
});

// for /edit
// save edits
app.post('/api/save', (req, res) => {
    const { filename, content } = req.body;
    const userDir = path.join(__dirname, 'entries', username);
    fs.writeFile(userDir+"/"+filename, content, err => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});


app.listen(3000, () => console.log('Server running on port 3000'));
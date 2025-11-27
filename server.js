const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const users = JSON.parse(fs.readFileSync('./database.json'));

app.use(cors()); // <-- enable cors or it don't work
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// express login thing
app.use(session({
    secret: "keytobereplacedlateridfk",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// save edits
app.post('/save', (req, res) => {
    const { filename, content } = req.body;
    fs.writeFile(filename, content, err => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

// login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(400).json({ error: "Invalid username or password" });
    }
    req.session.username = username;
    res.json({ message: "Logged in", username });
});

// CHECK SESSION
app.get('/me', (req, res) => {
    if (!req.session.username) return res.status(401).json({ loggedIn: false });
    res.json({ loggedIn: true, username: req.session.username });
});

// LOGOUT
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out" });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
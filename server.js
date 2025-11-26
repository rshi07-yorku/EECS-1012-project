const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors()); // <-- enable cors or it don't work
app.use(express.json());

app.post('/save', (req, res) => {
    const { filename, content } = req.body;
    fs.writeFile(filename, content, err => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
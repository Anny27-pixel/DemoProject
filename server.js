const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for carousel data
app.get('/api/carousel-data', (req, res) => {
    fs.readFile('./public/photos/book-description.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




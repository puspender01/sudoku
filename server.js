// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample in-memory scores storage
let scores = [];

// Get all scores
app.get('/scores', (req, res) => {
    res.json(scores);
});

// Add a new score
app.post('/scores', (req, res) => {
    const score = req.body;
    if (!score.player || typeof score.points !== 'number') {
        return res.status(400).send('Invalid score data');
    }
    scores.push(score);
    res.status(201).send('Score added');
});

// Get a specific score by player name
app.get('/scores/:player', (req, res) => {
    const playerScores = scores.filter(s => s.player === req.params.player);
    if (playerScores.length === 0) {
        return res.status(404).send('No scores found for this player');
    }
    res.json(playerScores);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

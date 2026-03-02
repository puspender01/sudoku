// database.js

// Initialize Firebase (or any other database service)
const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
admin.initializeApp();

// Reference to the Firestore database
const db = admin.firestore();

// Function to save Tetris game score
async function saveScore(playerName, score) {
    try {
        const scoreEntry = {
            player: playerName,
            score: score,
            timestamp: new Date().toISOString()
        };
        await db.collection('tetris_scores').add(scoreEntry);
        console.log('Score saved successfully');
    } catch (error) {
        console.error('Error saving score:', error);
    }
}

// Function to get all scores
async function getScores() {
    try {
        const scoresSnapshot = await db.collection('tetris_scores').get();
        const scores = scoresSnapshot.docs.map(doc => doc.data());
        return scores;
    } catch (error) {
        console.error('Error getting scores:', error);
        return [];
    }
}

module.exports = { saveScore, getScores };
// tetris.js

// Constants
const COLS = 10;
const ROWS = 20;
const START_POSITION = { x: COLS / 2 - 1, y: 0 };

// Game Variables
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentPiece;
let gameInterval;

// Starting the Game
function startGame() {
    currentPiece = getRandomPiece();
    drawBoard();
    gameInterval = setInterval(updateGame, 1000);
}

// Get a random Tetris piece
function getRandomPiece() {
    const pieces = 'IJLOSTZ';
    const randomIndex = Math.floor(Math.random() * pieces.length);
    return createPiece(pieces[randomIndex]);
}

// Create a new piece based on the type
function createPiece(type) {
    switch (type) {
        case 'I': return { shape: [[1, 1, 1, 1]], position: { ...START_POSITION } };
        case 'J': return { shape: [[1, 0, 0], [1, 1, 1]], position: { ...START_POSITION } };
        case 'L': return { shape: [[0, 0, 1], [1, 1, 1]], position: { ...START_POSITION } };
        case 'O': return { shape: [[1, 1], [1, 1]], position: { ...START_POSITION } };
        case 'S': return { shape: [[0, 1, 1], [1, 1, 0]], position: { ...START_POSITION } };
        case 'T': return { shape: [[0, 1, 0], [1, 1, 1]], position: { ...START_POSITION } };
        case 'Z': return { shape: [[1, 1, 0], [0, 1, 1]], position: { ...START_POSITION } };
    }
}

// Move the piece in the desired direction
function movePiece(direction) {
    const proposedPosition = { x: currentPiece.position.x + direction.x, y: currentPiece.position.y + direction.y };
    if (isValidMove(currentPiece.shape, proposedPosition)) {
        currentPiece.position = proposedPosition;
    }
}

// Check for collision with the board or other pieces
function isValidMove(shape, position) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const boardX = position.x + col;
                const boardY = position.y + row;
                if (boardX < 0 || boardX >= COLS || boardY < 0 || boardY >= ROWS || board[boardY][boardX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Update game logic
function updateGame() {
    movePiece({ x: 0, y: 1 });
    drawBoard();
}

// Draw the game board
function drawBoard() {
    const canvas = document.getElementById('tetris-canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw pieces and the board
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            if (board[row][col]) {
                context.fillStyle = 'blue';
                context.fillRect(col * 30, row * 30, 30, 30);
            }
        }
    }
}

// Save score to an external API
function saveScore(score) {
    fetch('https://example.com/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score })
    })
    .then(response => response.json())
    .then(data => console.log('Score saved:', data))
    .catch((error) => console.error('Error saving score:', error));
}

// Start the Tetris game
startGame();

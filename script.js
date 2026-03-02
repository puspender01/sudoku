const startBtn = document.getElementById('start-btn');
const playerInput = document.getElementById('player-name');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const playerDisplay = document.getElementById('player-display');
const timerDisplay = document.getElementById('timer');
const grid = document.getElementById('sudoku-grid');
const resetBtn = document.getElementById('reset-btn');
const solveBtn = document.getElementById('solve-btn');

let cells = [];
let timer;
let time = 0;

// Start Game
startBtn.addEventListener('click', () => {
    const name = playerInput.value.trim();
    if(!name){
        alert('Please enter your name!');
        return;
    }
    playerDisplay.textContent = `Player: ${name}`;
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    createGrid();
    startTimer();
});

// Create Sudoku Grid
function createGrid(){
    grid.innerHTML = '';
    cells = [];
    for(let i=0; i<81; i++){
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.addEventListener('input', (e)=>{
            const val = e.target.value;
            if(val < '1' || val > '9') e.target.value = '';
        });
        grid.appendChild(input);
        cells.push(input);
    }
}

// Timer
function startTimer(){
    time = 0;
    timerDisplay.textContent = `Time: 0s`;
    timer = setInterval(()=>{
        time++;
        timerDisplay.textContent = `Time: ${time}s`;
    }, 1000);
}

// Reset
resetBtn.addEventListener('click', ()=>{
    cells.forEach(cell => cell.value = '');
    clearInterval(timer);
    startTimer();
});

// Solve Demo (Random Fill)
solveBtn.addEventListener('click', ()=>{
    cells.forEach(cell=>{
        if(cell.value === '') cell.value = Math.floor(Math.random()*9)+1;
    });
    clearInterval(timer);
    alert(`Game ended! Time: ${time}s`);
});
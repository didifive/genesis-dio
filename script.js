// Constantes do jogo
const COLOR_ANIMATION_TIME = 600; // Duração de cada animação de cor (ms)
const AUDIO_DELAY = 400; // Delay antes de tocar o áudio (ms)
const CLICK_FEEDBACK_TIME = 250; // Duração do feedback visual do clique (ms)
const SEQUENCE_END_BUFFER = 200; // Tempo extra após sequência terminar (ms)
const TOTAL_COLORS = 4; // Número total de cores no jogo

const audio = [
    new Audio('assets/1.mp3')
    , new Audio('assets/2.mp3')
    , new Audio('assets/3.mp3')
    , new Audio('assets/4.mp3')
];
const audioError = new Audio('assets/error.mp3');

let order = [];
let clickedOrder = [];
let score = 0;
let isPlaying = false;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const playButton = document.querySelector('#play');
const resetRecord = document.querySelector('#reset');
const modal = document.getElementById('modal');
const modalButton = document.getElementById('modal-button');
const scoreLevel = document.getElementById('score-level');
const modalScore = document.getElementById('modal-score');
const modalRecord = document.getElementById('modal-record');
const modalLevel = document.getElementById('modal-level');
const recordDisplay = document.getElementById('record');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let randomColorIndex = Math.floor(Math.random() * TOTAL_COLORS);
    order.push(randomColorIndex);
    clickedOrder = [];

    isPlaying = true;
    for(let i = 0; i < order.length; i++) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, i + 1, order[i]);
    }
    
    // Libera cliques após sequência terminar
    setTimeout(() => {
        isPlaying = false;
    }, order.length * COLOR_ANIMATION_TIME + SEQUENCE_END_BUFFER);
}

//acende a proxima cor
let lightColor = (elementColor, number, color) => {
    number = number * COLOR_ANIMATION_TIME;
    setTimeout(() => {
        audio[color].play();
        elementColor.classList.add('selected');
    }, number - AUDIO_DELAY);
    setTimeout(() => {
        elementColor.classList.remove('selected');
    }, number);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i = 0; i < clickedOrder.length; i++) {
        if(clickedOrder[i] !== order[i]) {
            gameOver();
            return;
        }
    }
    if(clickedOrder.length === order.length) {
        score++;
        updateScoreDisplay();
        setTimeout(() => {
            shuffleOrder();
        }, 500);
    }
}

//funcao para o clique do usuario
let click = (color) => {
    if(isPlaying) return; // Impede cliques durante a sequência
    
    clickedOrder.push(color);
    createColorElement(color).classList.add('selected');
    audio[color].play();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, CLICK_FEEDBACK_TIME);
}

let control = (control) => {
    switch (control) {
        case 'play':
            playGame();
            break;
        case 'reset':
            localStorage.clear();
            recordDisplay.innerHTML = 0;
            break;
        default:
            location.reload(true);
    }
}

//funcao que retorna a cor
let createColorElement = (color) => {
    switch (color) {
        case 0: return green;
        case 1: return red;
        case 2: return yellow;
        case 3: return blue;
        default: 
            location.reload(true);
            return;
    }
}

//atualizar exibição do level
let updateScoreDisplay = () => {
    const displayValue = score + 1;
    scoreLevel.innerHTML = displayValue;
    adjustScoreFontSize(displayValue);
}

//ajustar tamanho da fonte baseado no número de dígitos
let adjustScoreFontSize = (value) => {
    const numDigits = String(value).length;
    let fontSize;
    
    if (numDigits <= 2) {
        fontSize = 'clamp(1.5rem, 12vmin, 3.5rem)';
    } else if (numDigits === 3) {
        fontSize = 'clamp(1.2rem, 10vmin, 2.8rem)';
    } else if (numDigits === 4) {
        fontSize = 'clamp(0.9rem, 8vmin, 2rem)';
    } else {
        fontSize = 'clamp(0.7rem, 6vmin, 1.5rem)';
    }
    
    scoreLevel.style.fontSize = fontSize;
}

//mostrar modal com informações do game over
let showGameOverModal = () => {
    const record = localStorage.getItem('record') || 0;
    const currentLevel = score + 1; // Nível em que errou
    const nivelText = score === 1 ? 'nível' : 'níveis';
    
    modalLevel.innerHTML = currentLevel;
    modalScore.innerHTML = score; // Níveis completados
    modalRecord.innerHTML = record;
    document.getElementById('modal-completion-text').innerHTML = `Ótimo! Completou <strong><span class="badge bg-success">${score}</span> ${nivelText}</strong>`;
    modal.classList.add('show');
}

//fechar modal
let closeGameOverModal = () => {
    modal.classList.remove('show');
    playGame();
}

//funcao para game over
let gameOver = () => {
    isPlaying = false;
    updateRecord();
    audioError.play();
    setTimeout(() => {
        showGameOverModal();
    }, 300);
}

//funcao de inicio do jogo
let playGame = () => {
    order = [];
    clickedOrder = [];
    score = 0;
    isPlaying = false;
    updateScoreDisplay();
    shuffleOrder();
}

//atualizar o Recorde
let updateRecord = () => {
    const currentRecord = Number.parseInt(localStorage.getItem('record')) || 0;
    if(score > currentRecord) {
        localStorage.setItem('record', score);
    }
    const record = localStorage.getItem('record') || 0;
    recordDisplay.innerHTML = record;
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
playButton.onclick = () => control('play');
resetRecord.onclick = () => control('reset');
modalButton.onclick = () => closeGameOverModal();

//Evento ao carregar a página
updateRecord();
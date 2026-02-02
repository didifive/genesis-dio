// Game Logic Controller
const COLOR_ANIMATION_TIME = 700; // Duração de cada animação de cor (ms)
const AUDIO_DELAY = 400; // Delay antes de tocar o áudio (ms)
const CLICK_FEEDBACK_TIME = 350; // Duração do feedback visual do clique (ms)
const SEQUENCE_END_BUFFER = 200; // Tempo extra após sequência terminar (ms)
const NEXT_LEVEL_DELAY = 500; // Delay antes de iniciar próximo nível (ms)
const TOTAL_COLORS = 4; // Número total de cores no jogo

// Constantes para tamanho da fonte
const FONT_SIZE_CONFIG = {
    twoDigits: 'clamp(1.5rem, 12vmin, 3.5rem)',
    threeDigits: 'clamp(1.2rem, 10vmin, 2.8rem)',
    fourDigits: 'clamp(0.9rem, 8vmin, 2rem)',
    manyDigits: 'clamp(0.7rem, 6vmin, 1.5rem)'
};

// Função para gerar número aleatório seguro
const getRandomColor = () => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % TOTAL_COLORS;
};

const audio = [
    new Audio('assets/audio/1.mp3')
    , new Audio('assets/audio/2.mp3')
    , new Audio('assets/audio/3.mp3')
    , new Audio('assets/audio/4.mp3')
];
const audioError = new Audio('assets/audio/error.mp3');

let order = [];
let clickedOrder = [];
let score = 0;
let isPlaying = true; // Controla se está tocando sequência ou se jogo não foi iniciado (bloqueia cliques)

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const scoreLevel = document.getElementById('score-level');
const recordDisplay = document.getElementById('record');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let randomColorIndex = getRandomColor();
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
        }, NEXT_LEVEL_DELAY);
    }
}

//funcao para o clique do usuario
let click = (color) => {
    if(isPlaying) return; // Impede cliques enquanto sequência toca ou jogo não iniciou
    
    clickedOrder.push(color);
    createColorElement(color).classList.add('selected');
    audio[color].play();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, CLICK_FEEDBACK_TIME);
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
        fontSize = FONT_SIZE_CONFIG.twoDigits;
    } else if (numDigits === 3) {
        fontSize = FONT_SIZE_CONFIG.threeDigits;
    } else if (numDigits === 4) {
        fontSize = FONT_SIZE_CONFIG.fourDigits;
    } else {
        fontSize = FONT_SIZE_CONFIG.manyDigits;
    }
    
    scoreLevel.style.fontSize = fontSize;
}

//funcao para game over
let gameOver = () => {
    isPlaying = true; // Bloqueia cliques novamente
    updateRecord();
    audioError.play();
    setTimeout(() => {
        showGameOverModal(score);
    }, GAME_OVER_MODAL_DELAY);
}

//funcao de inicio do jogo
let playGame = () => {
    order = [];
    clickedOrder = [];
    score = 0;
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

// ========================================
// CONTROLES DO JOGO
// ========================================

const playButton = document.querySelector('#play');
const resetRecord = document.querySelector('#reset');

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

// Eventos dos botões de controle
playButton.onclick = () => control('play');
resetRecord.onclick = () => control('reset');

//Evento ao carregar a página
updateRecord();

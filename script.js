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

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * TOTAL_COLORS);
    order.push(colorOrder);
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
        alert(`Pontuação atual: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
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
            updateRecord();
            break;
        default:
            alert('Um erro ocorreu, o game será recarregado!');
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
            alert('Um erro ocorreu, o game será recarregado!');
            location.reload(true);
            return;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    isPlaying = false;
    updateRecord();
    audioError.play();
    const record = localStorage.getItem('record') || 0;
    alert(`Você perdeu o jogo!
            \nPontuação: ${score}!
            \nSeu Recorde: ${record}!
            \nClique em OK para iniciar um novo jogo.`
    );
    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    order = [];
    clickedOrder = [];
    score = 0;
    isPlaying = false;
    nextLevel();
}

//atualizar o Recorde
let updateRecord = () => {
    const currentRecord = Number.parseInt(localStorage.getItem('record')) || 0;
    if(score > currentRecord) {
        localStorage.setItem('record', score);
    }
    const record = localStorage.getItem('record') || 0;
    document.getElementById('record').innerHTML = record;
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
playButton.onclick = () => control('play');
resetRecord.onclick = () => control('reset');

//Evento ao carregar a página
updateRecord();
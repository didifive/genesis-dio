// Modal Controller
const modal = document.getElementById('modal');
const modalButton = document.getElementById('modal-button');
const modalScore = document.getElementById('modal-score');
const modalRecord = document.getElementById('modal-record');
const modalLevel = document.getElementById('modal-level');

// Constante para delay do modal
const GAME_OVER_MODAL_DELAY = 300; // Delay antes de mostrar modal de game over (ms)

// Mostrar modal com informações do game over
let showGameOverModal = (score) => {
    const record = localStorage.getItem('record') || 0;
    const currentLevel = score + 1; // Nível em que errou
    const nivelText = score === 1 ? 'nível' : 'níveis';
    
    modalLevel.innerHTML = currentLevel;
    modalScore.innerHTML = score; // Níveis completados
    modalRecord.innerHTML = record;
    document.getElementById('modal-completion-text').innerHTML = `Ótimo! Completou <strong><span class="badge bg-success">${score}</span> ${nivelText}</strong>`;
    modal.classList.add('show');
}

// Fechar modal
const closeGameOverModal = () => {
    modal.classList.remove('show');
    if (typeof playGame === 'function') {
        playGame();
    } else {
        console.error('playGame is not defined or not a function. Unable to restart the game from the modal.');
    }
}

// Event listener para o botão do modal
modalButton.onclick = () => closeGameOverModal();

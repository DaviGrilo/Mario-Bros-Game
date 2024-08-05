const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const startScreen = document.querySelector('.start-screen');
const gameOverScreen = document.querySelector('.game-over');

const audioStart = new Audio('./som/audio_theme.mp3');
const audioGameOver = new Audio('./som/audio_gameover.mp3');

const scoreElement = document.querySelector('.score');
let score = 0;

let gameLoop;
let gameStarted = false;

const startGame = () => {
    if (gameStarted) return; 
    gameStarted = true;
    score = 0; 
    updateScore(0); 

    mario.src = './images/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';
    mario.style.marginLeft = '';

    pipe.style.left = '';
    pipe.classList.add('pipe-animation');

    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';

    audioStart.currentTime = 0;
    audioStart.play();
    audioStart.loop = true;

    gameLoop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = parseFloat(window.getComputedStyle(mario).bottom.replace('px', ''));

        updateScore(score + 1);

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            
            pipe.classList.remove('pipe-animation');
            pipe.style.left = `${pipePosition}px`;

            
            mario.classList.remove('jump');
            mario.src = './images/game-over.png';
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            
            audioStart.pause();
            audioGameOver.play();

            clearInterval(gameLoop);

            setTimeout(() => {
                gameOverScreen.style.display = 'flex';
            }, 500); 

            setTimeout(() => {
                audioGameOver.pause();
                audioGameOver.currentTime = 0;
            }, 7000);
        }
    }, 10);
};

const updateScore = (newScore) => {
    score = newScore;
    scoreElement.textContent = `Score: ${score}`;
};

const restartGame = () => {
    
    gameStarted = false;
    clearInterval(gameLoop);

    
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'flex';

    
    pipe.style.left = '';
    pipe.classList.add('pipe-animation');

    mario.src = './images/mario.gif';
    mario.style.width = '150px';
    mario.style.bottom = '0';
    mario.style.marginLeft = '';

    audioGameOver.pause();
    audioGameOver.currentTime = 0;

    audioStart.currentTime = 0;
};

const jump = () => {
    if (!gameStarted) return; 
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};


document.addEventListener('keypress', e => {
    if (e.key === ' ') {
        jump();
    }
});

document.addEventListener('touchstart', e => {
    if (e.touches.length) {
        jump();
    }
});

document.querySelector('.start').addEventListener('click', startGame);
document.querySelector('.game-over button').addEventListener('click', restartGame);

updateScore(0);

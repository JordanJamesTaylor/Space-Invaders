import AlienController from "./controllers/alienController.js";
import Player from "./sprites/player.js";
import LaserController from "./controllers/laserController.js";

// play space
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 610;
canvas.height = 475;

// play space background image
const background = new Image("");
background.src = "images/background.png";

// game screen canvas background
const gameOverBackground = new Image(canvas.width, canvas.height);
gameOverBackground.src = "images/game-over.png";
const gameWinBackground = new Image(canvas.width, canvas.height);
gameWinBackground.src = "./images/game-won.png";

let playerLaserController = new LaserController(canvas, 6, "red", true, "../sounds/player-laser.wav");
let alienLaserController = new LaserController(canvas, 4, "green", true, "../sounds/alien-laser.wav");
let alienController = new AlienController(canvas, alienLaserController, playerLaserController);
let player = new Player(canvas, 3, playerLaserController); // 3 = velocity

function rebuildSprites() {
    playerLaserController = new LaserController(canvas, 6, "red", true, "../sounds/player-laser.wav");
    alienLaserController = new LaserController(canvas, 4, "green", true, "../sounds/alien-laser.wav");
    alienController = new AlienController(canvas, alienLaserController, playerLaserController);
    player = new Player(canvas, 3, playerLaserController); // 3 = velocity
    playBtn.textContent = 'Restart';
};

let isGameOver = false;
let playerWon = false;

const playBtn = document.getElementById("play-btn");
function continuePlay() {
    if(playBtn.textContent === 'Restart'){
        window.location.href=window.location.href
    }else{
        playBtn.value = true;
    };
};
playBtn.addEventListener("click",continuePlay); 

let score = 0;
let highScore = 0;

function drawScore(ctx){
    ctx.font = "24px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(`Score: ${score}`, 10, 25);
};

function gameLoop(){    
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
        drawScore(ctx);
        alienController.draw(ctx);
        score = alienController.totalScore;
        player.draw(ctx);
        playerLaserController.draw(ctx);
        alienLaserController.draw(ctx);
    };
};

function displayGameOver(){
    if(isGameOver && playerWon){
        if(playBtn.value === 'false'){
            playBtn.value = 'false';
            ctx.fillStyle = `green`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(gameWinBackground, 0, 0, canvas.width, canvas.height);
        }else{
            playerWon = false;  
            playBtn.value = 'false';
            rebuildSprites();
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            isGameOver = false;
            return;
        };
    }else if(isGameOver){
        if(playBtn.value === 'false'){
            ctx.fillStyle = `red`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(gameOverBackground, 0, 0, canvas.width, canvas.height);
        }else{
            playBtn.value = 'false';
            rebuildSprites();
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            isGameOver = false;
            return;
        };
    };
};
 
function checkGameOver(){

    const winSound = new Audio("./sounds/winner.wav");
    const loseSound = new Audio("./sounds/game-over.wav");

    if(isGameOver) return;

    if(alienController.alienRows.length === 0){
        playBtn.textContent = 'Continue?';
        winSound.play();
        playerWon = true;
        isGameOver = true;
    };

    if(alienLaserController.collideWith(player)){
        loseSound.play();
        isGameOver = true;
    };

    if(alienController.collideWith(player)){
        loseSound.play();
        isGameOver = true;
    };
};

setInterval(gameLoop, 1000/60);
import AlienController from "./controllers/alienController.js";
import Player from "./sprites/player.js";
import LaserController from "./controllers/laserController.js";

// play space
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = 610;
canvas.height = 510;

// play space background image
const background = new Image("");
background.src = "images/background.png";

// game screen canvas background
const gameOverBackground = new Image(canvas.width, canvas.height);
gameOverBackground.src = "images/red-orange-game-over.png";
const gameWinBackground = new Image(canvas.width, canvas.height);
gameWinBackground.src = "./images/game-winner.jpg";

let score = 0;

const playerLaserController = new LaserController(canvas, 6, "red", true, "../sounds/player-laser.wav");
const alienLaserController = new LaserController(canvas, 4, "green", true, "../sounds/alien-laser.wav");
const alienController = new AlienController(canvas, alienLaserController, playerLaserController);
const player = new Player(canvas, 3, playerLaserController, score); // 3 = velocity

let isGameOver = false;
let playerWon = false;

function drawScore(ctx){
    ctx.font = "24px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Score: ${score}`, 10, 25)
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
        // let text = "YOU WIN!";
        // let textOffSet = 3;
        // ctx.font = "95px VT323";
        // ctx.fillText(text, canvas.width / textOffSet, canvas.height / 2);
        ctx.drawImage(gameWinBackground, 0, 0, canvas.width, canvas.height);
    }else if(isGameOver){
        ctx.drawImage(gameOverBackground, 0, 0, canvas.width, canvas.height);
    };
};

function checkGameOver(){

    const winSound = new Audio("./sounds/winner.wav");
    const loseSound = new Audio("./sounds/game-over.wav");

    if(isGameOver) return;

    if(alienController.alienRows.length === 0){
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
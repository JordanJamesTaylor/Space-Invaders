import AlienController from "./controllers/alienController.js";
import Player from "./sprites/player.js";
import LaserController from "./controllers/laserController.js";

// play space
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

// play space background image
const background = new Image();
background.src = "images/background.png"

const playerLaserController = new LaserController(canvas, 10, "red", true, "../sounds/player-laser.wav");
const alienLaserController = new LaserController(canvas, 4, "green", true, "../sounds/alien-laser.wav");
const alienController = new AlienController(canvas, alienLaserController, playerLaserController);
const player = new Player(canvas, 3, playerLaserController); // 3 = velocity

let isGameOver = false;
let playerWon = false;

function gameLoop(){
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if(!isGameOver){
        alienController.draw(ctx);
        player.draw(ctx);
        playerLaserController.draw(ctx);
        alienLaserController.draw(ctx);
    }
}

function displayGameOver(){
    if(isGameOver){
        let text = playerWon ? "You win!" : "Game over.";
        let textOffSet = playerWon ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffSet, canvas.height / 2);
    }
}

function checkGameOver(){

    if(isGameOver) return;

    if(alienLaserController.collideWith(player)){
        isGameOver = true;
    }

    if(alienController.collideWith(player)){
        isGameOver = true;
    }

    if(alienController.alienRows.length === 0){
        playerWon = true;
        isGameOver = true;
    }
};

setInterval(gameLoop, 1000/60);
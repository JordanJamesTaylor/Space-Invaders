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

function gameLoop(){
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    alienController.draw(ctx);
    player.draw(ctx);
    playerLaserController.draw(ctx);
    alienLaserController.draw(ctx);
}

setInterval(gameLoop, 1000/60);
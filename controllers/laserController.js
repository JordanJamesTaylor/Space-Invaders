import Laser from "../sprites/laser.js";

export default class LaserController{

    lasers = [];
    timeTillNextLaserAllowed = 0;

    constructor(canvas, maxLasersOnScreen, laserColour, soundEnabled){
        this.canvas = canvas;
        this.maxLasersOnScreen = maxLasersOnScreen;
        this.laserColour = laserColour;
        this.soundEnabled = soundEnabled;

        this.laserSound = new Audio("../sounds/player-laser.wav");
        this.laserSound.volume = 0.5;
    }
    
    draw(ctx){
        if(this.timeTillNextLaserAllowed > 0) this.timeTillNextLaserAllowed--;
    }

    fire(x, y, velocity, timeTillNextLaserAllowed = 0){
        if(this.timeTillNextLaserAllowed <= 0 && this.lasers.length < this.maxLasersOnScreen){ // creates gaps between lasers
            const laser = new Laser(this.canvas, x, y, velocity, this.laserColour);
            this.lasers.push(laser);
            if(this.soundEnabled){
                // stop play sound if it's currently play 
                this.laserSound.currentTime = 0;
                // play new firing sound
                this.laserSound.play();
            }
            this.timeTillNextLaserAllowed = timeTillNextLaserAllowed;
        }
    }

}
import Laser from "../sprites/laser.js";

export default class LaserController{

    // tracks lasers on screen --> max is set to 10
    lasers = [];
    timeTillNextLaserAllowed = 5;

    constructor(canvas, maxLasersOnScreen, laserColour, soundEnabled, laserSound){
        this.canvas = canvas;
        this.maxLasersOnScreen = maxLasersOnScreen;
        this.laserColour = laserColour;
        this.soundEnabled = soundEnabled;

        this.laserSound = new Audio(laserSound);
        this.laserSound.volume = 0.1;
    }
    
    draw(ctx){
        // removes laser from arr if they're outside canvas limits 
        this.lasers = this.lasers.filter(
            (laser) => laser.y + laser.width > 0 && laser.y <= this.canvas.height
        );
        
        this.lasers.forEach(laser => laser.draw(ctx));

        if(this.timeTillNextLaserAllowed > 0) this.timeTillNextLaserAllowed--;
    }

    collideWith(sprite) {
        const laserThatHitSpriteIndex = this.lasers.findIndex((laser) => 
            laser.collideWith(sprite)
        );
    
        if (laserThatHitSpriteIndex >= 0) {
            this.lasers.splice(laserThatHitSpriteIndex, 1);
            return true;
          }
    
        return false;
    }

    fire(x, y, velocity, timeTillNextLaserAllowed = 0){
        if(
            this.timeTillNextLaserAllowed <= 0 && 
            this.lasers.length < this.maxLasersOnScreen
        ){ // creates gaps between lasers
            const laser = new Laser(this.canvas, x, y, velocity, this.laserColour);
            this.lasers.push(laser);
            if(this.soundEnabled){
                // stop playing sound if it's currently play 
                this.laserSound.currentTime = 0;
                // play new firing sound
                this.laserSound.play();
            }
            this.timeTillNextLaserAllowed = timeTillNextLaserAllowed;
        }
    }

}
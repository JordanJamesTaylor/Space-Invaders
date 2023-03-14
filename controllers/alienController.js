import Alien from "../sprites/alien.js";
import MovingDirection from "../movingDirection.js";

export default class AlienController{

    // alien spawn map
    // 0 = no alien spawns
    tileMap = [
        [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
        [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 2, 2, 2, 1, 1, 2, 2, 2, 0],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    ];
    alienRows = [];

    // start moving right
    currentDirection = MovingDirection.right;
    // speed moving horizontally and vertically
    xVelocity = 0; 
    yVelocity = 0;
    // can change speed dependant on direction of movement
    defaultXVelocity = 1; 
     defaultYVelocity = 1;
    // move down then move horizontally
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    fireLaserTimerDefault = 100;
    fireLaserTimer = this.fireLaserTimerDefault;

    constructor(canvas, alienLaserController, playerLaserController){
        this.canvas = canvas;
        this.alienLaserController = alienLaserController;
        this.playerLaserController = playerLaserController;
        this.alienDeathSound = new Audio('./sounds/alien-death.wav');
        this.alienDeathSound.volume = .2;

        this.createAliens();
    }

    draw(ctx){ // build alien
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawAliens(ctx);
        this.resetMoveDownTimer();
        this.fireLaser();
    }

    collisionDetection(){
        this.alienRows.forEach((alienRow) => { // grid --> alien map
            alienRow.forEach((alien, alienIndex) => { // grid row --> row of aliens
                if(this.playerLaserController.collideWith(alien)){ // if player hit alien
                    this.alienDeathSound.currentTime = 0;
                    this.alienDeathSound.play();
                    // update player score
                    
                    // remove alien from arr
                    alienRow.splice(alienIndex, 1);
                }
            });
        });

        // if all aliens on a row have been destroyed then remove that row
        this.alienRows = this.alienRows.filter((alienRow) => alienRow.length > 0);
    }

    fireLaser(){
        this.fireLaserTimer--;
        if(this.fireLaserTimer <= 0){
            this.fireLaserTimer = this.fireLaserTimerDefault;
            // populate shallow arr with all aliens
            const allAliens = this.alienRows.flat();
            // grab a random alien from arr
            const alienIndex = Math.floor(Math.random() * allAliens.length);
            const alien = allAliens[alienIndex];
            // random alien fires laser
            // alien.x + alien.width / 2 = laser shoots from centre of alien ship
            // -3 = laser moves down
            // this.alienLaserController.fire(alien.x + alien.width / 2, alien.y, -3);
            
            this.alienLaserController.fire(alien.x, alien.y, -3);
        }
    }

    resetMoveDownTimer(){
        if(this.moveDownTimer <= 0){ // once timer has elapsed
            // reset timer
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer(){
        // check if aliens are moving down
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight){
            // decrement moveDownTimer
            this.moveDownTimer--;
        }
    }

    // first alien to reach edge of canvas changes direction for all aliens
    updateVelocityAndDirection(){
        for(const alienRow of this.alienRows){
            if(this.currentDirection == MovingDirection.right){ // move right
                // continue moving right
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostAlien = alienRow[alienRow.length-1];
                if(rightMostAlien.x + rightMostAlien.width >= this.canvas.width){ // hit right side of canvas
                    // change direction --> move down and begin moving left
                    this.currentDirection = MovingDirection.downLeft;
                    break; // early exit --> no need to loop over any remaining rows
                }
            }else if(this.currentDirection === MovingDirection.downLeft){ 
                if(this.moveDown(MovingDirection.left)){ // move left once alien finished moving down
                    break;
                }
            }else if(this.currentDirection === MovingDirection.left){ // move left
                // stop moving right
                this.xVelocity = -this.defaultXVelocity;
                // if yVelocity != 0 then aliens will move diagonally down-left
                this.yVelocity = 0;
                const leftMostAlien = alienRow[0];
                if(leftMostAlien.x <= 0){ // hit left side of canvas
                    // change direction --> move down and right
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            }else if(this.currentDirection ===  MovingDirection.downRight){ 
                if(this.moveDown(MovingDirection.right)){ // move right once alien finished moving down
                    break;
                }
            }
        }
    }

    moveDown(newDirection){
        // stop moving right
        this.xVelocity = 0;
        // reset yVelocity
        this.yVelocity = this.defaultYVelocity;
        if(this.moveDownTimer <= 0){ // once aliens have moved down desired amount
            // change direction 
            this.currentDirection = newDirection;
            // stop moving down
            return true;
        }         
        // continue moving down
        return false;
    }

    drawAliens(ctx){
        // fill each row with aliens
        this.alienRows.flat().forEach((alien) => {
            alien.move(this.xVelocity, this.yVelocity)
            alien.draw(ctx);
        })
    }

    createAliens(){
        this.tileMap.forEach((row, rowIndex) => {
            // add rows == num of arrays in tileMap
            this.alienRows[rowIndex] = [];

            // alienNum = int in tileMap
            // create alien obj base on int value
            // add alien obj to alienRows arr
            row.forEach((alienNum, alienIndex) => {
                if(alienNum > 0){ // 0 in tileMap == no alien spawns
                    // alienIndex * 50 = gap between aliens
                    // rowIndex * 35 = gap between rows
                    this.alienRows[rowIndex].push(new Alien(alienIndex * 50, rowIndex * 35, alienNum))
                }
           }); 
        });
    }

    collideWith(sprite){
        return this.alienRows.flat().some(alien => alien.collideWith(sprite));
    }
}
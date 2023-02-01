export default class Player{

    rightPress = false;
    leftPress = false;
    gunsFired = false;

    constructor(canvas, velocity, laserController){
        this.canvas = canvas;
        this.velocity = velocity;
        this.laserController = laserController;
        // centre player ship
        this.x = this.canvas.width / 2;
        // slightly move player ship up from bottom of canvas for aesthetics
        this.y = this.canvas.height -75; 
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "images/player-ship.png";
    
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx){ // build player ship
        if(this.gunsFired){
            // this.x+this.width/2 = laser fires from middle of ship
            // this.y = ship position on y axis
            // 4 = laser firing speed
            // 10 = rate of fire (space between lasers)
            this.laserController.fire(this.x + this.width / 2, this.y, 4, 10)
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls(){
        if(this.x < 0){ // hit left side of canvas
            // stop moving left
            // checks if left side of ship hits the left side of the canvas
            this.x = 0;
        }else if(this.x > this.canvas.width - this.width){ // hit right side of canvas
            // stop moving right
            // -this.width keeps ship on screen; checks if right part of the ship hits the right side of canvas
            this.x = this.canvas.width - this.width;
        }
    }
    
    move(){ // responds to player input
        if(this.rightPress){ // move right
            this.x += this.velocity;
        }else if(this.leftPress){ // move left
            this.x += -this.velocity;
        }
    }

    keydown = e => {
        // move right
        if(e.code == 'ArrowRight') this.rightPress = true;
        // move left
        if(e.code == 'ArrowLeft') this.leftPress = true;
        // shoot
        if(e.code == "Space") this.gunsFired = true;
    }

    keyup = e => {
        // stop moving right
        if(e.code == 'ArrowRight') this.rightPress = false;
        // stop moving left
        if(e.code == 'ArrowLeft') this.leftPress = false;
        // stop shooting
        if(e.code == "Space") this.gunsFired = false;
    }
}
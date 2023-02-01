export default class Laser{

    constructor(canvas, x, y, velocity, laserColour){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.laserColour = laserColour;
        // laser's dimensions --> rectangle
        this.width = 5;
        this.height = 20;
    }

    draw(ctx){
        // move up screen  
        this.y -= this.velocity;
        // set laser's colour
        ctx.fillStyle = this.laserColour;
        // draw laser
        ctx.fillRect(this.x, this.y, this.width, this.height); 
    }

    collideWith(sprite) {
        if (
          this.x + this.width > sprite.x &&
          this.x < sprite.x + sprite.width &&
          this.y + this.height > sprite.y &&
          this.y < sprite.y + sprite.height
        ) {
          return true;
        } else {
          return false;
        }
    }
}

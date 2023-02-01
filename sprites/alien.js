export default class Alien{
    
    constructor(x, y, imgNum){
        // where the alien spawns
        this.x = x;
        this.y = y;

        // size of alien
        this.width = 44;
        this.height = 32;

        // compare imgNum to number in alien files
        // set alien based on num 
        this.img = new Image();
        this.img.src = `images/alien${imgNum}.png`
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    move(xVelocity, yVelocity){
        this.x += xVelocity;
        this.y += yVelocity;
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
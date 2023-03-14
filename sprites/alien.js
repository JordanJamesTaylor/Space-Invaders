export default class Alien{
    
    constructor(x, y, imgNum){
        // where the alien spawns
        this.x = x;
        this.y = y + 25;

        // size of alien
        this.width = 44;
        this.height = 32;

        // compare imgNum to number in alien files
        // set alien based on num 
        this.img = new Image();
        this.img.src = `images/alien${imgNum}.png`
        // assign points based on colour
        if(imgNum === 1) this.pointVal = 50;
        if(imgNum === 2) this.pointVal = 100;
        if(imgNum === 3) this.pointVal = 250;
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
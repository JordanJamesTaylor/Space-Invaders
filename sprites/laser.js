export default class Laser{

    constructor(canvas, x, y, velocity, laserColouor){
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.laserColouor = laserColouor;
        // laser's dimensions --> rectangle
        this.width = 5;
        this.height = 20;
    }

    draw(){
        
    }
}
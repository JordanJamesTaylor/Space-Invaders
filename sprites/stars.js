class Stars {
    constructor({ position, velocity, radius, fades }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.color = '#fff';
        this.opacity = 1;
        this.fades = fades;
    }

    draw() {
        c.save();
        c.globalAlpha = this.opacity;
        c.behinPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color;
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.position.x == this.velocity.x
        this.position.y == this.velocity.y
        this.opacity = opacity
    }
}
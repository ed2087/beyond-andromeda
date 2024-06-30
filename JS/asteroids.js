let asteroids = [];

let store_edge = 0;

class Asteroid {
    constructor() {
        this.asteroid_index = getRandom_max_min(28, 1);
        this.img = new Image();
        this.img.src = `IMG/asteroids/Stones_${this.asteroid_index}.png`;

        this.radius = 44;
        this.width = 119;
        this.height = 120;
        this.color = "darkred";

        // asteroid info
        this.live = getRandom_max_min(50, 10);
        this.reward = getRandom_max_min(500, 20);

        this.id = Math.round() * 9999999;
        this.maxtime_alive = 4000;
        this.tick = 0;
        this.destroy = false;

        // Determine starting edge (0: left, 1: right, 2: top, 3: bottom)
        let edge = getRandom_max_min(3, 0);

        //make sure we dont use the same edge twice
        // Determine starting edge (0: left, 1: right, 2: top, 3: bottom)
       
        do {
            edge = getRandom_max_min(0, 3);
        } while (edge === store_edge);
        
        store_edge = edge;

        if (edge === 0) { // left edge
            this.x = -this.radius * 3;
            this.y = getRandom_max_min(canvas.height, 0);
            this.velocity = { dx: getRandom_max_min(4, 1), dy: getRandom_max_min(4, -4) };
        } else if (edge === 1) { // right edge
            this.x = canvas.width + this.radius * 3;
            this.y = getRandom_max_min(canvas.height, 0);
            this.velocity = { dx: getRandom_max_min(-1, -4), dy: getRandom_max_min(4, -4) };
        } else if (edge === 2) { // top edge
            this.x = getRandom_max_min(canvas.width, 0);
            this.y = -this.radius * 3;
            this.velocity = { dx: getRandom_max_min(4, -4), dy: getRandom_max_min(4, 1) };
        } else if (edge === 3) { // bottom edge
            this.x = getRandom_max_min(canvas.width, 0);
            this.y = canvas.height + this.radius * 3;
            this.velocity = { dx: getRandom_max_min(4, -4), dy: getRandom_max_min(-1, -4) };
        }

        this.rotation = 0; // initial rotation angle
        this.rotationSpeed = getRandom_max_min(2, -2); // random rotation speed
    }

    update() {
        this.x += this.velocity.dx;
        this.y += this.velocity.dy;
        this.rotation += this.rotationSpeed;

        // wrap around the screen
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;

        this.tick++;
        if (this.tick > this.maxtime_alive) {
            this.destroy = true;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    destroyAsteroid() {
        this.destroy = true;
    }

}
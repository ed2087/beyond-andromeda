let particlesArray = [];
let fps_particles_mutlple_check = 6;

class Particles {
    constructor(x, y, radius, velocity, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;

        this.gravity = 0.05; // Gravity factor
        this.friction = 0.99; // Friction factor
        this.opacity = 1; // Opacity of the particle

        this.destroyTimer = getRandom_max_min(50, 20);
        this.timeTracker = 0;
        this.destroy = false;
    }

    update() {
        // Apply gravity
        this.velocity.dy += this.gravity;

        // Apply friction
        this.velocity.dx *= this.friction;
        this.velocity.dy *= this.friction;

        // Update position
        this.x += this.velocity.dx;
        this.y += this.velocity.dy;

        // Reduce opacity
        this.opacity -= 0.01;

        // Destroy particle if opacity is too low or timer is up
        this.timeTracker++;
        if (this.timeTracker > this.destroyTimer || this.opacity <= 0) {
            this.destroy = true;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity; // Set particle opacity
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const CreateParticles = (ele) => {
    for (let i = 0; i < ele.radius * fps_particles_mutlple_check; i++) {
        particlesArray.push(new Particles(
            ele.x, 
            ele.y, 
            getRandom_max_min(ele.radius / 4, ele.radius / 8), // Randomize size
            {
                dx: getRandom2_max_min(2, -2),
                dy: getRandom2_max_min(2, -2)
            },
            ele.color
        ));
    }
};

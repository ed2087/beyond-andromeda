let particlesArray = [];
let fps_particles_mutlple_check = 6;

class Particles {

    constructor(x,y,radius,velocity,color){

        this.x = x;
        this.y = y;

        this.radius = radius;
        this.velocity =  velocity;
        this.color = color;

        this.destroyTimer = getRandom_max_min(50, 20);
        this.timeTracker = 0;
        this.destroy = false;

    }

    update(){
        
        this.x += this.velocity.dx;
        this.y += this.velocity.dy;

        this.timeTracker++;
        if(this.timeTracker > this.destroyTimer) this.destroy = true;

    }

    draw(){       

            
        ctx.beginPath();  
        ctx.fillStyle = this.color;                  
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);// X, Y, RADIUS
        ctx.fill();//fill the whole cirlcle 
                      


    }

};


const  CreateParticles = (ele) => {

    for (let i = 0; i < ele.radius * fps_particles_mutlple_check; i++) {
        
        particlesArray.push(new Particles(
            
            ele.x, ele.y, ele.radius / 4, {
                dx : getRandom2_max_min(5, -5),
                dy : getRandom2_max_min(5, -5)
            },ele.color//"#f65e04"

        ))
        
    };

};
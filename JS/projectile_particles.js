let projectile_particlesArray = [];


class Proj_Particles {

    constructor(x,y,radius,velocity,color,time){

        this.x = x;
        this.y = y;

        this.radius = radius;
        this.velocity =  velocity;
        this.color = color;

        this.destroyTimer = getRandom_max_min(time, 5);
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


const  CreateProj_Particles = (ele) => {

    for (let i = 0; i < ele.radius * 2; i++) {
        
        projectile_particlesArray.push(new Proj_Particles(
            
            ele.x, ele.y, ele.radius / 8, {
                dx : getRandom2_max_min(5, -5),
                dy : getRandom2_max_min(5, -5)
            },ele.color, ele.radius / 10

        ))
        
    };

};
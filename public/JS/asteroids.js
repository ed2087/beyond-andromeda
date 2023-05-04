let asteroids = [];


class Asteroid {

    constructor(){

        this.asteroid_index = getRandom_max_min(28,1);
        this.img = new Image();
        this.img.src = `../IMG/asteroids/Stones_${this.asteroid_index}.png`;

        this.radius = 44;
        this.width = 119;
        this.height = 120;
        this.color = "darkred"

        //asteroid info
        this.live = getRandom_max_min(50, 10);
        this.reward = getRandom_max_min(500, 20);

        this.id = Math.round() * 9999999;
        this.maxtime_alive = 4000;
        this.tick = 0;
        this.destroy = false;

        this.x = getRandom_max_min(2, 0) > 0 ? canvas.width + (this.radius * 3) : 0 - (this.radius * 3);
        this.y = getRandom_max_min(2, 0) > 0 ? canvas.height + (this.radius * 3) : 0 - (this.radius * 3);

        this.velocity = {
            dx : 0,
            dy : 0
        } 

    }

    update(){

            this.x += this.velocity.dx;
            this.y += this.velocity.dy;


            this.tick++
            if(this.tick > this.maxtime_alive){                
                this.destroy = true;
            }

    }

    draw(){     


        // ctx.beginPath();  
        // ctx.fillStyle = this.color;                  
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);// X, Y, RADIUS
        // ctx.fill();//fill the whole cirlcle 
        

        ctx.drawImage(

            this.img,           
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height

        );

    }

};


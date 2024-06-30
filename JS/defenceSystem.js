let defenceProjectiles = [];


class DefenceProjectile {

    constructor(){

        this.radius = getRandom2_max_min(20, 10);
        this.color = random_rgba();

        this.x = getRandom2_max_min(canvas.width + this.radius * 2, 0 - this.radius * 2);
        this.y = getRandom2_max_min(canvas.height + this.radius * 2, 0 - this.radius * 2);       

        this.fireRate = 0.1;
        this.speedRate = 1;
        this.detectionRadius = this.radius / 2;

        this.velocity = {
            dx:0,
            dy:0
        };


    }


    update(){
        this.x -= this.velocity.dx;
        this.y -= this.velocity.dy;
    }

    draw(){

        ctx.beginPath();  
        ctx.fillStyle = this.color;                  
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);// X, Y, RADIUS
        ctx.fill();//fill the whole cirlcle 

        ctx.beginPath();  
        ctx.strokeStyle = this.color;                  
        ctx.arc(this.x, this.y, this.radius * this.detectionRadius, 0, Math.PI * 2);// X, Y, RADIUS
        ctx.stroke();

    }


};




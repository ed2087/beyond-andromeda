// const loading animation function

const loading_animation = (ele, tick, time) => {

    id_(ele).style.background = "rgb(241 136 6 / 55%)";
    id_(ele).style.width = tick * 100 / time+"%";

};


class Player {

    constructor(index){

        //this ship options
        this.indexShip = index;// 0 wiil be the default = stating ship
        
        //ship info
        this.radius = 30;
        this.money = 0;
        this.score = 0;
        this.kills = 0;
        this.playerLive = shipClasses[this.indexShip].playerLive; 
        this.playerLive_default = shipClasses[this.indexShip].playerLive; 
        this.UpGrade_cap = shipClasses[this.indexShip].UpGrade_cap;
        this.playerSpeed_multyplier = shipClasses[this.indexShip].playerSpeed_multyplier;

        this.color = shipClasses[this.indexShip].color;
        this.defenceColor = "white";
        this.attackColor = "silver"

        this.x = (canvas.width / 2) - this.radius / 2;
        this.y = (canvas.height / 2) - this.radius / 2;      

        this.defenceRadius = 5;
        this.firingRadius = 8;

        // normal gun
        this.fireRate = shipClasses[this.indexShip].fireRate;        
        this.speedRate = shipClasses[this.indexShip].speedRate;
        this.ProjectileCoolDownTime = shipClasses[this.indexShip].ProjectileCoolDownTime;
        this.coolDownTick = 0;
        this.AbleToFire = true;
        this.damage_normalGun = shipClasses[this.indexShip].damage_normalGun;

        // big  gun
        this.big_ProjectileCoolDownTime = shipClasses[this.indexShip].big_ProjectileCoolDownTime;
        this.big_coolDownTick = 0;
        this.big_AbleToFire = false;
        this.damage_BigGun = shipClasses[this.indexShip].damage_BigGun;


        // shild Cool down time
        this.shild_timeUp = shipClasses[this.indexShip].shild_timeUp;
        this.shild_cool_downTime = shipClasses[this.indexShip].shild_cool_downTime;
        this.shild_coolDownTick = 0;
        this.shild_active = false;
        this.Shild_Activated_Cooldown = false;
        this.lockUIbutton = false;

        // player auto repair 
        this.repair_time = shipClasses[this.indexShip].repair_time;
        this.repair_tick = 0;  

        //player identifiers
        this.id = Math.floor(Math.random() * 999);
        this.unic_id = Math.random() * 9999999999;


        this.velocity = {
            dx:0,
            dy:0
        };


        // prices for upgrades
        this.gun_UpgradePrice = shipClasses[this.indexShip].gunUpgradePrice;
        this.missile_UpgradePrice = shipClasses[this.indexShip].missileUpgradePrice;
        this.sheild_UpgradePrice = shipClasses[this.indexShip].sheildUpgradePrice;
        this.repair_UpgradePrice = shipClasses[this.indexShip].repairUpgradePrice;

        // IMAGES

        // ship image
        this.img = new Image();
        this.img.src = shipClasses[this.indexShip].src;
        this.spriteWidth = shipClasses[this.indexShip].ship_width / 4;
        this.spriteHeight = shipClasses[this.indexShip].ship_height / 4;
        this.degrees = 22;

        //shield
        this.Shild_img = new Image();
        this.Shild_img.src = "../IMG/shields/spr_shield.png";
        this.Shild_spriteWidth = 556 / 4;
        this.Shild_spriteHeight = 556 / 4;
        

    }


    update(){

        //add slow down effect
        this.x += this.velocity.dx * this.speedRate;
        this.y += this.velocity.dy * this.speedRate; 
        
        
        // Big gun
        if(!this.big_AbleToFire){
            this.big_coolDownTick++;
            loading_animation("SmartProjectilw", this.big_coolDownTick, this.big_ProjectileCoolDownTime);
        } 
        if (this.big_coolDownTick >= this.big_ProjectileCoolDownTime) {//rgb(0 255 0)
            this.big_AbleToFire = true;
            id_("SmartProjectilw").style.background = "rgb(1 255 20 / 33%)";
            this.big_coolDownTick = 0;            
        }


        // small gun
        if(!this.AbleToFire){
            this.coolDownTick++;
            loading_animation("commonProjectile", this.coolDownTick, this.ProjectileCoolDownTime);
        } 
        if (this.coolDownTick >= this.ProjectileCoolDownTime) {
            this.AbleToFire = true;
            id_("commonProjectile").style.background = "rgb(1 255 20 / 33%)";
            this.coolDownTick = 0;            
        }     
        
        // repair ship
        if(this.playerLive < shipClasses[this.indexShip].playerLive){
                
            this.repair_tick++;
            loading_animation("PlayerLife_bar", this.repair_tick, this.repair_time);

            if(this.repair_tick >= this.repair_time){                
                this.repair_tick = 0;
                this.playerLive += 1;
                id_("playerLife").innerHTML = "&#10084; "+this.playerLive;
            }

        }else{

            id_("PlayerLife_bar").style.background = "rgb(1 255 20 / 33%)";              

        }


    }

    draw(){

        // ctx.beginPath();  
        // ctx.strokeStyle = "red";                  
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);// X, Y, RADIUS
        // ctx.stroke();//fill the whole cirlcle       
                  
                
        ctx.drawImage(

            this.img,// sprite/image             
            this.x - this.spriteWidth / 2,//      sprite/image X position
            this.y - this.spriteHeight / 2.5,//       sprite/image Y position
            this.spriteWidth,//        sprite/image width
            this.spriteHeight//         sprite/image height

        );


        // defence radius

            // ctx.beginPath();  
            // ctx.strokeStyle = this.defenceColor;                  
            // ctx.arc(this.x, this.y, this.radius * this.defenceRadius, 0, Math.PI * 2);// X, Y, RADIUS
            // ctx.stroke();//stroke the whole cirlcle 


            // check if shild is active
            if(this.shild_active){

                this.shild_coolDownTick++;
                this.lockUIbutton = true;

                id_("shild").style.background = "rgb(241 136 6 / 55%)";

                // DRAW SHILD
                ctx.drawImage(
                
                    this.Shild_img,// sprite/image             
                    this.x - this.Shild_spriteWidth,//      sprite/image X position
                    this.y - this.Shild_spriteHeight,//       sprite/image Y position
                    this.Shild_spriteWidth * 2,//        sprite/image width
                    this.Shild_spriteHeight * 2 //         sprite/image height
    
                );
                

                if(this.shild_coolDownTick >= this.shild_timeUp){
                    this.shild_coolDownTick = 0;
                    player.shild_active = false;
                    this.Shild_Activated_Cooldown = true; 
                    resetAudio(sheild_sound);                   
                }

            }        
            
            if(this.Shild_Activated_Cooldown){

                this.shild_coolDownTick++;
                id_("shild").style.width = this.shild_coolDownTick * 100 / this.shild_cool_downTime+"%";

                if(this.shild_coolDownTick >= this.shild_cool_downTime){

                    id_("shild").style.background = "rgb(1 255 20 / 33%)";
                    this.Shild_Activated_Cooldown = false;
                    this.lockUIbutton = false;
                    this.shild_coolDownTick = 0;

                }

            }


        // firing radius

            // ctx.beginPath();  
            // ctx.strokeStyle = this.attackColor;                  
            // ctx.arc(this.x, this.y, this.radius * this.firingRadius, 0, Math.PI * 2);// X, Y, RADIUS
            // ctx.stroke();//fill the whole cirlcle 

    }


};

//commonProjectile

player = new Player(0);//add index for ship



///////////////////////////////////////////////
//    CHARACTER MOVEMENT
///////////////////////////////////////////////
var keyState = {};

const keyMove = (e) => {       
     
    
    if(keyState.ArrowRight || keyState.d){

        if(player.x + player.radius * 2 > canvas.width) return
        player.x += player.playerSpeed_multyplier;

    }    

    if(keyState.ArrowLeft || keyState.a){

        if(player.x - player.radius * 2 < 0) return
        player.x -= player.playerSpeed_multyplier;

    }

    if(keyState.ArrowUp || keyState.w){

        if(player.y - player.radius * 2 < 0) return
        player.y -= player.playerSpeed_multyplier;

    }

    if(keyState.ArrowDown || keyState.s){

        if(player.y + player.radius * 2 > canvas.height) return
        player.y += player.playerSpeed_multyplier;

    }        
    

    player.update();
    player.draw();

};


window.addEventListener("keydown", (e) => {
    keyState[e.key] = true;   
});

window.addEventListener("keyup", (e) => {  
    keyState[e.key] = false;
});


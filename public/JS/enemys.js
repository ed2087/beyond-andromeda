/////////////////////////////////////////////////////////////////////
//  ADD ENEMYS TO THE ARRAY THAT CAN SPAWN
/////////////////////////////////////////////////////////////////////
let monterMapping = [];

const pushEleToArray = (ele,numberOfEnemy) => {
    let tick_ = 0;
    while(tick_ < numberOfEnemy){
        monterMapping.push(ele)//add normal units
        tick_++        
    }

}

const shuffleArray = () => monterMapping = randomArrayShuffle(monterMapping);



/////////////////////////////////////////////////////////////////////
//  ENEMY STATIC POSITIONS OF SPAWN
/////////////////////////////////////////////////////////////////////
let enemyPost_fixed = [
    {//left top corner
        x : 100,
        y : 100
    },
    {// bottom left corner
        x : 100,
        y : canvas.height - 100
    },
    {//right top corner
        x : canvas.width - 100,
        y : 100
    },
    {// right bottom corner
        x : canvas.width - 100,
        y : canvas.height - 100
    },
    {// top middle
        x : canvas.width  / 2,
        y : 100
    },
    {// bottom midle
        x : canvas.width / 2,
        y : canvas.height - 100
    },
    {// left middle
        x : canvas.width / 2,
        y : 100
    },
    {// right middle
        x : canvas.width - 100,
        y : canvas.height / 2
    }
]; 



/////////////////////////////////////////////////////////////////////
//ENEMY CLASS
/////////////////////////////////////////////////////////////////////
let enemy_audio = id_("enemy_spawn");
class Enemy {

    constructor(monsterName){
        
        this.radius = enemyClasses[monsterName].radius;
        this.color = enemyClasses[monsterName].color;
        this.reward = enemyClasses[monsterName].reward;
        
        this.getPost = enemyPost_fixed[Math.floor(Math.random() * enemyPost_fixed.length)];        
        this.x = this.getPost.x;
        this.y =  this.getPost.y;

        // add sound
        this.audio_src = enemyClasses[monsterName].spawnSound;
        this.play_Spawn = true;
        
        this.fireRate = enemyClasses[monsterName].fireRate;
        this.fireMultiple = enemyClasses[monsterName].fireMultiple;
        this.detectionRadius = enemyClasses[monsterName].type == "Gutfang" ? this.radius * (this.radius / 6) :this.radius * (this.radius / 2);
        this.missileDefence = enemyClasses[monsterName].missileDefence;
        this.player_enemy_distance = 0;

        this.cooldown_timer = enemyClasses[monsterName].cooldown_timer;
        this.cooldown_tick = 0;
        this.fire = true;
        this.Projectiles_fired = 0;
        this.id = "enemy_players";
        this.unic_id = Math.random() * 9999999999;
        this.type = enemyClasses[monsterName].type; 

        this.originalVelocity = enemyClasses[monsterName].velocity;
        this.veloDXMath = getRandom_max_min(enemyClasses[monsterName].velocity,-enemyClasses[monsterName].velocity) > 0 ? enemyClasses[monsterName].velocity : -enemyClasses[monsterName].velocity;
        this.veloDYMath = getRandom_max_min(enemyClasses[monsterName].velocity,-enemyClasses[monsterName].velocity) > 0 ? enemyClasses[monsterName].velocity : -enemyClasses[monsterName].velocity;
        
        this.velocity = {
            dx: this.veloDXMath,
            dy: this.veloDYMath
        };        
        this.velocityMutilple = enemyClasses[monsterName].velocityMutilple;

        this.smart_move = enemyClasses[monsterName].smart;
        this.able_to_turn_smart = enemyClasses[monsterName].able_to_turn_smart;

        this.live = enemyClasses[monsterName].live; 
        this.destroy = false;   
        this.timeChaching = 0;
        this.damage = enemyClasses[monsterName].damage; 

        // ammo type
        this.ammoIMG = enemyClasses[monsterName].ammoIMG;
        
        
        this.img = new Image();
        this.img.src = `${enemyClasses[monsterName].imgSrc}${getRandom_max_min(4, 1)}.png`;
        this.spriteWidth = enemyClasses[monsterName].vehicle_width / 4;
        this.spriteHeight = enemyClasses[monsterName].vehicle_height / 4;

    }


    update(){

        this.x -= this.velocity.dx;
        this.y -= this.velocity.dy; 
        
        // play audio spawn
        if(this.play_Spawn){
            this.play_Spawn = false;
            enemy_audio.src = this.audio_src;
            enemy_audio.play();            
        }

        if(this.cooldown_tick >= this.cooldown_timer) {

            this.fire = true;
            this.cooldown_tick = 0;

        }else{

            this.fire = false;
            this.cooldown_tick++; 

        }


    }

    draw(){

        ctx.beginPath();  
        ctx.fillStyle = this.color;                  
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);// X, Y, RADIUS
        ctx.fill();//fill the whole cirlcle 
       
       
        ctx.font = '20px serif';
        ctx.textBaseline = "hanging";
        ctx.fillStyle = "white"
        ctx.fillText(this.live, this.x + this.radius * 2, this.y - this.radius / 2);

        // ctx.beginPath();  
        // ctx.strokeStyle = this.color;                  
        // ctx.arc(this.x, this.y, this.detectionRadius, 0, Math.PI * 2);// X, Y, RADIUS
        // ctx.stroke();


        ctx.drawImage(

            this.img,// sprite/image             
            this.x - this.spriteWidth / 2,//      sprite/image X position
            this.y - this.spriteHeight / 2,//       sprite/image Y position
            this.spriteWidth,//        sprite/image width
            this.spriteHeight//         sprite/image height

        );
        

    }


};









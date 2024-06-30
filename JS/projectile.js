let projectiles = [];
let SmartProjectiles = [];

class Projectile {
    constructor(x, y, velocity, radius, color, id, Owner_damage, missileKillers) {
        this.radius = radius;
        this.color = color;
        this.x = x;
        this.y = y;
        this.velocity = velocity;

        this.Owner = id;
        this.Owner_damage = Owner_damage;
        this.destroy = false;
        this.missileKillers = missileKillers;

        this.gravity = 0.1; // Gravity factor
    }

    update() {
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.destroy = true;
        }

        // Apply gravity
        this.velocity.dy += this.gravity;

        this.x -= this.velocity.dx;
        this.y -= this.velocity.dy;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}




const getClosestEne = () => {
    enemys.forEach(ene => {
        let distance = checkDistance_pythagoreanTheorem(ene,player);        
        ene.player_enemy_distance = distance;
    })
};

// smart Missile
const sendSmartMissile = () => {

    getClosestEne();
    let enemy_piked = enemys.sort((a, b) => parseFloat(a.player_enemy_distance) - parseFloat(b.player_enemy_distance));
    
    let ChooseTarget = enemy_piked[0];

    if(!player.big_AbleToFire) return

    SmartProjectiles.push(new Projectile(

        player.x, player.y,
        {
            dx : 0,
            dy : 0
        },
        player.radius / 3, player.color, ChooseTarget.unic_id,player.damage_BigGun

    )) 

    player.big_AbleToFire = false;

};

let missile_audio = audioFun("SOUND/global/missile_close.wav"); 
let missile_audio_start = audioFun("SOUND/global/missile.wav"); 
let lockMissile_audio = false;
let lockMIssile_start = false;
const moveToTarget = (target) => {  
    
    SmartProjectiles.forEach(projectile => {        

        //check for missile / enemy exist
        let find_ = enemys.find(ele => ele.unic_id == projectile.Owner)
        
        if(find_ == undefined){//reset the missile
            
            getClosestEne();
            target = enemys.sort((a, b) => parseFloat(a.player_enemy_distance) - parseFloat(b.player_enemy_distance));

            if(target){
                target = target[0];
                projectile.Owner = target.unic_id;
            }else{
                projectile.destroy = true;
                return
            }

        }; 

        if(target.unic_id === projectile.Owner){

            // play one time when missile sent
            if(lockMIssile_start == false){               
                missile_audio_start.play();
                lockMIssile_start = true;
            }
            

            let targetCor =  moveToEle(projectile, target);
            
            projectile.velocity = {
                dx : targetCor.x * 6,
                dy : targetCor.y * 6
            }

            CreateParticles(projectile);

            let distance = checkDistance_pythagoreanTheorem(projectile, target);
           
            // play missile audio when getting ready to hit
            if(distance <= target.detectionRadius && lockMissile_audio === false){
                missile_audio.play();
                lockMissile_audio = true;                

            }
            
            if(distance <= target.radius + projectile.radius){

                projectile.destroy = true;
                CreateParticles(target);
                target.live -= player.damage_BigGun; 
                lockMissile_audio = false;
                lockMIssile_start = false;

            }


        };
         

    });

};




//lest create an enemy smart projectile but the target must be player and the missile mushave a live span of 10 seconds
let enemySmartMissile = [];


class EnemySmartMissile {
    constructor(x, y, velocity, radius, color, id, Owner_damage, missileKillers) {
        this.radius = radius;
        this.color = color;
        this.x = x;
        this.y = y;
        this.velocity = velocity;

        this.Owner = id;
        this.Owner_damage = Owner_damage;
        this.destroy = false;
        this.missileKillers = missileKillers;

        this.gravity = 0.1; // Gravity factor
    }

    update() {
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.destroy = true;
        }

        // Apply gravity
        this.velocity.dy += this.gravity;

        this.x -= this.velocity.dx;
        this.y -= this.velocity.dy;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}




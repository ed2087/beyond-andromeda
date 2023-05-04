const gameINfo_text = () => {
    ctx.font = "50px Arial";
    ctx.fillStyle  = textInfo.color;
    ctx.fillText(textInfo.text, textInfo.x, textInfo.y); 
}


//fix asteroid givin money when hitting enemy


/////////////////////////////////////////////////////////////////////
//   UPDATE AND DELITE ALL ANIMATION---- this need to be her because it is beaing used by diffent function
/////////////////////////////////////////////////////////////////////

const update_del_animations = () => {


[...enemys, ...projectiles, ...projectile_particlesArray, ...particlesArray,...SmartProjectiles,...asteroids].forEach(objects => objects.update());
[...enemys, ...projectiles, ...projectile_particlesArray, ...particlesArray,...SmartProjectiles,...asteroids].forEach(objects => objects.draw());    


projectiles = projectiles.filter(object => !object.destroy);
projectile_particlesArray = projectile_particlesArray.filter(object => !object.destroy);
particlesArray = particlesArray.filter(object => !object.destroy);
enemys = enemys.filter(object => !object.destroy);
SmartProjectiles = SmartProjectiles.filter(object => !object.destroy);
asteroids = asteroids.filter(object => !object.destroy);


};


/////////////////////////////////////////////////////////////////////
//  END GAME LEVEL
/////////////////////////////////////////////////////////////////////
let interval_LevelEnd;
let enemyTick = 1;
let number_of_enemy_Allowed = 20;
let numberOf_enemySpawnd_thisRound = 0;
let backgroundTraker = 0;
let level_tick_ = 0;
let trackEnemy_k = 1;
let levelActivateBoss = 10;
let lockCreate = false;


const upgradeEnemy = () => {
    for (var key in enemyClasses) {
        if (enemyClasses.hasOwnProperty(key)) {
            enemyClasses[key].damage += enemyClasses[key].damage > 20 ? 0 : 1;
            enemyClasses[key].reward += 10;
            enemyClasses[key].live += enemyClasses[key].live > 300 ? 0 : player.damage_normalGun;
        }
    }
};

const level_controller = () => {


if (trackEnemy_Kills === enemy_per_Level) {
    
    lockGameFun = true;//pause game
    trackEnemy_Kills = 0;//reset tick  
    
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    id_("announcements").style.display = "flex";
    id_("announcements").innerHTML = "";

    let tick_ = 0;
    interval_LevelEnd = setInterval(() => {      

        // add a count timer

        tick_++;             
        id_("announcements").innerHTML = tick_ > 2 ? `Level ${level_ + 1}` :tick_;        

        if(tick_ <= 3){
            
            let start = audioFun("../SOUND/global/startAlarm.wav"); 
            start.play(); 

        }
        
        if(tick_ >= 4){

            clearInterval(interval_LevelEnd);

            lockGameFun = false; 

            //check if no more enemy in array
            enemyTick++;
            if(enemyTick > 6) enemyTick = 1;

            //add more enemy per level
            enemy_per_Level += 4;
            if(enemy_per_Level > 60){
                enemy_per_Level = 60;
            }

            // upgrade level 
            level_++
            level_tick_++

            // CLEAR ARRAYS
            projectile_particlesArray = [];
            projectiles = [];
            SmartProjectiles = [];
            
            // upgrade enemy
            if(level_tick_ >= 10){
                
                upgradeEnemy();
                enemy_cap = enemy_cap >= 8 ? 8 : enemy_cap += 1;
                //reset tick
                level_tick_ = 0;
                //spawn enemy faster
                spawnInterval = spawnInterval <= 1000 ? 1000 : spawnInterval -= 50;

            };
            

            //reset background
            backgroundClass.x = 0;
            backgroundTraker++;
            backgroundTraker = backgroundTraker >= background_array.length ? 1 : backgroundTraker;
            backgroundClass.img.src = background_array[backgroundTraker];
            

            number_of_enemy_Allowed = 50;// only allow 4 boss to be added at a time
            numberOf_enemySpawnd_thisRound = 0; 

            //give player some life
            if(player.playerLive < player.playerLive_default) player.playerLive =  player.playerLive+25 > player.playerLive_default ? player.playerLive_default : player.playerLive + 25;

            pushEleToArray(enemyTick,number_of_enemy_Allowed);//add firs level enemy
            shuffleArray();//shuffle enemy
            animate(0);
            id_("announcements").style.display = "none";
            
        }

    },2000);


    
}


};

// PLAYER FUNCTIONS /////////////////////////////////////

let mouseCor = {
x: 0,
y:0
}

let playerFire = undefined;
const playerShoot = (e) => {
    
    
    if(!player.AbleToFire) return;

    let velocity_ = moveToSpot(mouseCor.x, mouseCor.y, player)       
        
        gun_fire = audioFun("../SOUND/player/gun/laser.ogg");
        gun_fire.volume = 0.2;
        gun_fire.play();
    
    projectiles.push(new Projectile(

        x = player.x,
        y = player.y,
        velocity = {
            dx : -velocity_.x * player.fireRate,
            dy : -velocity_.y * player.fireRate,
        },
        8,
        player.color,
        Owner = player.id

    ));

    player.AbleToFire = false;     
    
};

const playerFunctions = () => {    

player.velocity = {
    dx : move_direction.x,
    dy : move_direction.y
};

ctx.beginPath();  
ctx.strokeStyle = "white";                  
ctx.arc(mouseCor.x, mouseCor.y, 40, 0, Math.PI * 2);// X, Y, RADIUS
ctx.arc(mouseCor.x, mouseCor.y, 20, 0, Math.PI * 2);// X, Y, RADIUS
ctx.stroke();//fill the whole cirlcle


player.update();
player.draw();

}

////////////////////////////////////////////////
//ANTICHEAT PUNISH HIM
///////////////////////////////////////////////
let lockAnticheat = false;
const anticheat = () => {

    for (var key in enemyClasses) {
        if (enemyClasses.hasOwnProperty(key)) {
            enemyClasses[key].damage += enemyClasses[key].damage * 6;
            enemyClasses[key].live = enemyClasses[key].live * 6;
            enemyClasses[key].able_to_turn_smart = true;
            enemyClasses[key].missileDefence = true;
            enemyClasses[key].cooldown_timer = 8;
        }
    }

    //add all units
    let tick_cheat = 0;
    while(tick_cheat < 100){
        monterMapping.push(1,2,3,4,5,6)//add normal units
        tick_cheat++        
    };

    enemy_cap = 10;//allow more enemy

    lockAnticheat = true;//lock this function permantly

    //message
    console.log(
        "%c BITCH ALERT...","color:red;font-family:system-ui;font-size:2rem;-webkit-text-stroke: 1px black;font-weight:bold",
       
       
       
        `
    ////////////////////////////////////////////////////////////////////////////////////
        I SEE YOU GOING TO CHEAT LIKE A LITTLE BITCH.. I GOT SOMETHING FOR YOUR CHEATING ASS!
    ////////////////////////////////////////////////////////////////////////////////////
        
        `
    );

};


////////////////////////////////////////////////
//ENEMY FUNCTIONS
///////////////////////////////////////////////

//check for enemys life
const enemysLive = (enemy) => {

    if(player.money > trackMoney && !lockAnticheat) anticheat();

    if(enemy.live <= 0){ 
        
        if(enemy.type == "Gutfang"){
            lockCreate = false;//create normal units
            resetAudio(bossSound);//reset boss audio
            //mult boss levels
            levelActivateBoss += 5;
        }else{
            //only count normal units
            trackEnemy_Kills++;
        }

        
        enemy.destroy = true;
        //givePlayer money 
        player.money += enemy.reward; 
        player.score += (enemy.radius / 2 )* 2;
        player.kills++;
        CreateParticles(enemy); 

        //anti cheat track money
        trackMoney = player.money;

    }

};


const desideIfEnemy_moves = (ene, distance) => {

    if(ene.type != "Gutfang"){

        //able_to_turn_smart
        if(distance + player.radius <= ene.detectionRadius && ene.able_to_turn_smart === true){

            ene.smart_move = true;

            //stop other from chansing
            enemys.forEach(ene2 => {

                    if(ene2.timeChaching > ene.timeChaching){

                        ene2.smart_move = false;

                        ene2.velocity = {
                            dx: ene2.veloDXMath,
                            dy: ene2.veloDYMath
                        };
                        ene2.timeChaching = 0;//reset tick

                    };


            });


            
        };


    }


};


const checkIfEnmey_isOutOfCanvas = (ene) => {

    if(ene.x < 0 || ene.x > canvas.width || ene.y < 0  || ene.y > canvas.height){

            if(ene.type == "Gutfang") return;
            //ene.destroy = true;
            let index = Math.floor(Math.random() * enemyPost_fixed.length)
            ene.x = enemyPost_fixed[index].x
            ene.y = enemyPost_fixed[index].y 
            

    }

};

//skip bullets
const getOutOfTheWayOf_bullets = (ene,proj) => {

    ene.x -= proj.velocity.dy;
    ene.y -= proj.velocity.dx;   

};

//boss missile defence
let limit_anti = 0;
const missile_defence = (ene) => {

    SmartProjectiles.forEach(missl => {

        let ene_proj_distance = checkDistance_pythagoreanTheorem(missl, ene);        

        if(ene.missileDefence == true && ene_proj_distance < (ene.radius + missl.radius) * 6 && missl.Owner != ene.id){  
            
            //set radius for missile detection        
            ctx.beginPath();
            ctx.strokeStyle = ene.color;                  
            ctx.arc(ene.x, ene.y, (ene.radius + missl.radius) * 6, 0, Math.PI * 2);// X, Y, RADIUS
            ctx.stroke();
            ctx.closePath();

            if(enemy_missile_defence_sound.currentTime <= 0){
                enemy_missile_defence_sound.play();                
            }


            let velocity_ = moveToEle(ene, missl)

            projectiles.push(new Projectile(

                x = ene.x,
                y = ene.y,
                velocity = {
                    dx : velocity_.x * ene.fireRate,
                    dy : velocity_.y * ene.fireRate,
                },        
                7,
                "rgb(255 129 0 / 80%)",
                Owner = ene.id,
                ene.damage,
                true

            )); 
                
        }else{

            enemy_missile_defence_sound.onended = (e) => {

                resetAudio(enemy_missile_defence_sound);

            }

        }

    })   


};



const enemyFunctions = () => { 

    enemys.forEach(obj => {             

            let moveTO = undefined;
                    

            let distance_player_enemy = checkDistance_pythagoreanTheorem(obj,player);
            let proj_check = undefined;            
            
            if(obj.smart_move == true){

                moveTO = moveToEle(obj,player);

                if(distance_player_enemy + player.radius <= obj.detectionRadius){//stop if close to player and fire

                    obj.velocity = {
                        dx : 0,
                        dy : 0
                    }                     
                }else{//if player faraway move closer    
                    

                    obj.velocity = {
                        dx : moveTO.x * obj.velocityMutilple,
                        dy : moveTO.y * obj.velocityMutilple,
                    } 

                    //add time enemy haas been chasing player
                    obj.timeChaching++;

                } 

            }


            if(distance_player_enemy <= obj.detectionRadius + player.radius){//stop if close to player and fire
                
                
                //fire
                if(obj.fire == true){                    

                    projectile_create(obj,player);
                    enemy_gun_sound = audioFun("../SOUND/global/enemy-gun-sound.mp3");
                    enemy_gun_sound.play();

                }

                ctx.beginPath();
                    ctx.strokeStyle = "rgb(255 0 0 / 49%)";//ballArray[i].color;
                    ctx.lineWith = 10;
                    ctx.lineDashOffset = 6;
                    ctx.moveTo(obj.x, obj.y);
                    ctx.lineTo(player.x, player.y);
                    ctx.stroke();
                    ctx.closePath(); 

            }

            
            moveToTarget(obj);
            //check if enemy hits end of canvas
            wallCollition(obj, 2); 
            // check if enemy is allowed to chase player
            desideIfEnemy_moves(obj, distance_player_enemy);
            //check if enemy is out of canvas
            checkIfEnmey_isOutOfCanvas(obj)
            //check if enemy still alive
            enemysLive(obj)
            //missile defence
            missile_defence(obj)
            

    });


};

//choose enemy unit
const chooseMonster = () => {

    const mosterName_index  = Math.floor(Math.random() * monterMapping.length);
    let monsterName = undefined;

    switch (monterMapping[mosterName_index]) {
        case 1:
                monsterName = "normal"
            break;

            case 2:
                monsterName = "speedy"
            break;

            case 3:
                monsterName = "harden"
            break; 

            case 4:
                monsterName = "normal_smart"
            break; 

            case 5:
                monsterName = "speedy_smart"
            break; 

            case 6:
                monsterName = "harden_smart"
            break; 

            case 7:
                monsterName = "boss"
            break;     
        default:
            break;
    }

    return monsterName


};


///////////////////////////////////////////////////////////
// fire projectiles functions
//////////////////////////////////////////////////////////
function projectile_create  (attacker, target)  {

    let velocity_ = moveToEle(attacker, target)

    projectiles.push(new Projectile(

        x = attacker.x,
        y = attacker.y,
        velocity = {
            dx : velocity_.x * attacker.fireRate,
            dy : velocity_.y * attacker.fireRate,
        },        
        8,
        attacker.color,
        Owner = attacker.id,
        attacker.damage,
        false

    ));    

    attacker.Projectiles_fired++;

};

// PLAYER DIED ADD ENDING FUNCTIONS
const playerDied = () => {

// display endingScreen
id_("endGame_wrap").style.display ="flex";

//add value to input
id_("lvl_input").value = level_;
id_("kills_input").value = player.kills;
id_("score_input").value = player.score;
id_("money_input").value = player.money;

//add display
id_("lvl_").innerHTML = level_;
id_("killed_").innerHTML = player.kills;
id_("score_").innerHTML = player.score;
id_("money_").innerHTML = player.money;

}; 


//projectile functions
let missile_audio_explotion = audioFun("../SOUND/global/missile-explotion.wav");// new explotion adio for 
const projectile_function = () => {

    projectiles.forEach(proj => {
        
        let is_wall = wallCollition_trufy(proj, -proj.radius);

        if(is_wall){
            proj.destroy = true;
        }

        CreateProj_Particles(proj);

        // test is projectile impacted player
        let player_proj_distance = checkDistance_pythagoreanTheorem(proj, player);

        if(player.shild_active){
            
            if(player_proj_distance < player.radius * 6 + proj.radius && proj.Owner != player.id){            
                
                proj.destroy = true;
                CreateParticles(proj);           
                
            }


        }else{

            if(player_proj_distance < player.radius + proj.radius && proj.Owner != player.id){  
                player.playerLive -= proj.Owner_damage;     
                id_("playerLife").innerHTML = "&#10084; "+player.playerLive;
                proj.destroy = true;
                CreateParticles(proj);  
                
                //PLAYER HAS DIED 
                if(player.playerLive <= 0){
                    pauseGame = true;
                    playerDied();
                };
                
            };

        };       


        // enemy projectile hit

        enemys.forEach(ene => {

            let ene_proj_distance = checkDistance_pythagoreanTheorem(proj, ene);

            if(ene.type == "Gutfang" && ene_proj_distance < (ene.radius + proj.radius) * 4 && proj.Owner != ene.id){
                getOutOfTheWayOf_bullets(ene, proj);  
            }

            if(ene_proj_distance < ene.radius + proj.radius && proj.Owner != ene.id){                

                //create explotion
                CreateParticles(proj);
                //destroy missile
                proj.destroy = true;
                //damage enemy
                ene.live -= player.damage_normalGun;

            }

        })


        // missile defence

        SmartProjectiles.forEach(sMiss => {

            let ene_sm_distance = checkDistance_pythagoreanTheorem(proj, sMiss); 

            if(ene_sm_distance < sMiss.radius + proj.radius && proj.Owner != sMiss.id && proj.missileKillers == true){                

                //create explotion
                CreateParticles(proj);
                //destroy missile
                sMiss.destroy = true;
                proj.destroy = true;

                // missile got hit by defence reset audio and locks                
                lockMissile_audio = false;
                lockMIssile_start = false;

                //reset all audio related with samrt misslie
                resetAudio(missile_audio_start);
                resetAudio(missile_audio);
                resetAudio(missile_audio_explotion);
                missile_audio_explotion.play();


            }

        })


    });

};


// ASTEROID FUNCTIONS

const asteroid_function = () => {

    asteroids.forEach(asteroid => {


        //give asteroid direction
        let x_ = getRandom2_max_min(canvas.width - asteroid.radius * 2, 0 + asteroid.radius * 2);
        let y_ = getRandom2_max_min(canvas.height - asteroid.radius * 2, 0 + asteroid.radius * 2);
    

        if(asteroid.velocity.dx == 0 && asteroid.velocity.dy == 0){

            let velo = moveToSpot(x_, y_, asteroid);

            asteroid.velocity = {

                dx : velo.x,
                dy : velo.y

            };

        };
        
        
        // player check
        let player_distance = checkDistance_pythagoreanTheorem(asteroid, player);


            if(player_distance < player.radius + asteroid.radius){

                player.playerLive -= 25;
                CreateParticles(asteroid);
                asteroid.destroy = true;

            }


        // enemy check
        enemys.forEach(ene => {

            let enemy_distance = checkDistance_pythagoreanTheorem(asteroid, ene);

            if(enemy_distance < ene.radius + asteroid.radius){
            
                CreateParticles(asteroid);
                ene.live -= 25;                
                asteroid.destroy = true;

            }

        })

        //check if asteroid is still alive

        projectiles.forEach(proj => {

            let gun_distance = checkDistance_pythagoreanTheorem(proj,asteroid);

            if(gun_distance < proj.radius + asteroid.radius){

                asteroid.live--;              
                if(asteroid.live <= 0){

                    CreateParticles(asteroid);
                    player.money += asteroid.reward;
                    asteroid.destroy = true;
                    proj.destroy = true;
                    //anti cheat
                    trackMoney = player.money;

                }else{
                    
                    CreateParticles(proj);
                    proj.destroy = true;

                }              
                

            };

        });       


    })

};

function animate (timeStamp){

    //check if level is over
    level_controller();  

    if(pauseGame){
        cancelAnimationFrame(animationInfo)
    }else{

        //clear all
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // add background
        backgroundClass.update();
        backgroundClass.draw();
        
        if(!lockGameFun){

            let deltaTime = timeStamp - lastTime; //between timestamp from this loop and save time stamp value from the previous loop
            lastTime = timeStamp; // save timeStamp to check in next loop
            timeToNextspawn += deltaTime;// get time between frames                 
            
            trackEnemy_k = enemy_per_Level - trackEnemy_Kills;//check enemys still playing               

            
            if(timeToNextspawn > spawnInterval && enemys.length < enemy_cap){
                                
                if(numberOf_enemySpawnd_thisRound <= enemy_per_Level - 1){//check if max amout of enemy have spawn

                    let getType = chooseMonster();

                    if(level_ == levelActivateBoss && !lockCreate){//get boss only 
                        enemys.push(new Enemy("boss")) 
                        //stop cretion
                        lockCreate = true;
                        bossSound.play();     
                    };

                    if(!lockCreate){//if enemy do not allow any other unit to spwan
                        enemys.push(new Enemy(getType))       
                        timeToNextspawn = 0;
                        numberOf_enemySpawnd_thisRound++                     
                    }
                        
                    
                }                 

            }; 

            //run game naimations using players fps
            let deltaTime_ = timeStamp - fps_last;
            fps_last = timeStamp;
            fps_tick += deltaTime_;
            id_("fps_").innerHTML = Math.floor(1000 / deltaTime_) + "FPS"; 
           
            
            if(fps_tick > fps_next){
                        
                        // fire gun 
                        if(playerFire){
                            playerShoot();
                        }


                        // asteroid
                        next_toSpawn++;
                        if(next_toSpawn > asteroid_spawnInterval){

                            asteroids.push(new Asteroid())                
                            next_toSpawn = 0;
                            asteroid_spawnInterval = getRandom_max_min(3000, 1000);

                        };


                        keyMove();//check for player movement
                        playerFunctions();     
                        enemyFunctions();
                        projectile_function();
                        // asteroids
                        asteroid_function();        


                        // check for money upgrades
                        id_("PlayerMoney").innerHTML = "$ "+player.money.toLocaleString();
                        // check player life
                        id_("playerLife").innerHTML = "&#10084; "+player.playerLive;
                        // display level
                        id_("level").innerHTML = "LV - "+level_;
                        //display enemys

                        id_("enemy_per_level").innerHTML = "&#9760; ("+ trackEnemy_k +")";        

                        //update and delite
                        update_del_animations();  

                //reset and display                    
                fps_tick = 0;

            }; 
            
            
            animationInfo = requestAnimationFrame(animate);
            

        }
        

    }
    

};


//listeners

id_("canvas").addEventListener("mousemove", (e) => {   

mouseCor = {

    x: e.x,
    y: e.y

}

});

id_("canvas").addEventListener("mousedown", () => {
    playerFire = true;
});
window.addEventListener("mouseup", () =>{

    playerFire = false;

});



//activate smart missile
id_("smartMissile").addEventListener("click", sendSmartMissile);


// activate shield lockUIbutton
id_("shild").addEventListener("click", () => {       

    if(player.lockUIbutton) return
        player.shild_active = true;
        sheild_sound.loop = true;
        sheild_sound.play();  

});

window.addEventListener("keydown", (e) => {


    if(e.key == "q"){//send missile
        sendSmartMissile()
    }

    if(e.key == "e"){//activate shield
        if(player.lockUIbutton) return
        player.shild_active = true 
        sheild_sound.loop = true;
        sheild_sound.play(); 
    }

});



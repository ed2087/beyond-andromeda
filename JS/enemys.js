/////////////////////////////////////////////////////////////////////
//  ADD ENEMYS TO THE ARRAY THAT CAN SPAWN
/////////////////////////////////////////////////////////////////////
let monterMapping = [];

const pushEleToArray = (ele, numberOfEnemy) => {
    let tick_ = 0;
    while (tick_ < numberOfEnemy) {
        monterMapping.push(ele); // add normal units
        tick_++;
    }
}

const shuffleArray = () => monterMapping = randomArrayShuffle(monterMapping);

const loading_animation_ = (ele, tick, time) => {
    id_(ele).style.background = "rgb(241 136 6 / 55%)";
    id_(ele).style.width = tick * 100 / time + "%";
};

/////////////////////////////////////////////////////////////////////
//  ENEMY STATIC POSITIONS OF SPAWN
/////////////////////////////////////////////////////////////////////
let enemyPost_fixed = [
    { // left top corner
        x: 100,
        y: 100
    },
    { // bottom left corner
        x: 100,
        y: canvas.height - 100
    },
    { // right top corner
        x: canvas.width - 100,
        y: 100
    },
    { // right bottom corner
        x: canvas.width - 100,
        y: canvas.height - 100
    },
    { // top middle
        x: canvas.width / 2,
        y: 100
    },
    { // bottom middle
        x: canvas.width / 2,
        y: canvas.height - 100
    },
    { // left middle
        x: 100,
        y: canvas.height / 2
    },
    { // right middle
        x: canvas.width - 100,
        y: canvas.height / 2
    }
];

/////////////////////////////////////////////////////////////////////
//  ENEMY CLASS
/////////////////////////////////////////////////////////////////////
let enemy_audio = id_("enemy_spawn");

class Enemy {
    constructor(monsterName) {
        this.radius = enemyClasses[monsterName].radius;
        this.color = enemyClasses[monsterName].projectile_color;
        this.shipColor = enemyClasses[monsterName].shipColor;
        this.rangeColor = enemyClasses[monsterName].rangeColor;
        this.reward = enemyClasses[monsterName].reward;

        // big gun
        this.big_ProjectileCoolDownTime = 200;
        this.big_coolDownTick = 0;
        this.big_AbleToFire = enemyClasses[monsterName].big_AbleToFire;
        this.damage_BigGun = 15;

        this.getPost = enemyPost_fixed[Math.floor(Math.random() * enemyPost_fixed.length)];
        this.x = this.getPost.x;
        this.y = this.getPost.y;

        // add sound
        this.audio_src = enemyClasses[monsterName].spawnSound;
        this.play_Spawn = true;

        this.fireRate = enemyClasses[monsterName].fireRate;
        this.fireMultiple = enemyClasses[monsterName].fireMultiple;
        this.detectionRadius = enemyClasses[monsterName].type == "Gutfang" ? this.radius * (this.radius / 6) : this.radius * (this.radius / 2);
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
        this.veloDXMath = getRandom_max_min(enemyClasses[monsterName].velocity, -enemyClasses[monsterName].velocity) > 0 ? enemyClasses[monsterName].velocity : -enemyClasses[monsterName].velocity;
        this.veloDYMath = getRandom_max_min(enemyClasses[monsterName].velocity, -enemyClasses[monsterName].velocity) > 0 ? enemyClasses[monsterName].velocity : -enemyClasses[monsterName].velocity;

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

        // Additional properties for boss-specific behavior
        this.isBoss = monsterName === 'boss';
        if (this.isBoss) {
            this.originalVelocity = Math.min(enemyClasses[monsterName].velocity, 3); // Moderate the boss's speed
        }
    }

    update() {
        if (this.smart_move) {
            let distance_player_enemy = checkDistance_pythagoreanTheorem(this, player);

            if (distance_player_enemy > SAFE_DISTANCE) {
                this.x -= this.velocity.dx;
                this.y -= this.velocity.dy;
            } else {
                this.velocity = { dx: 0, dy: 0 }; // Stop movement if within safe distance
            }
        } else {
            this.x -= this.velocity.dx;
            this.y -= this.velocity.dy;
        }

        if (this.cooldown_tick >= this.cooldown_timer) {
            this.fire = true;
            this.cooldown_tick = 0;
        } else {
            this.fire = false;
            this.cooldown_tick++;
        }

        if (this.isBoss) {
            if (this.x < this.radius) this.x = this.radius;
            if (this.x > canvas.width - this.radius) this.x = canvas.width - this.radius;
            if (this.y < this.radius) this.y = this.radius;
            if (this.y > canvas.height - this.radius) this.y = canvas.height - this.radius;
        }

        if (this.missileDefence) {
            missile_defence(this);
        }

        // Big gun
        // if (this.big_AbleToFire) {
        //     if (this.big_coolDownTick >= this.big_ProjectileCoolDownTime) {
        //         this.big_AbleToFire = true;
        //         this.big_coolDownTick = 0;
        //         sendEnemySmartMissile(this);
        //     } else {
        //         this.big_coolDownTick++;
        //     }
        // }
    }

    draw() {
        ctx.beginPath();

        // Draw the ship
        ctx.fillStyle = this.shipColor;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // X, Y, RADIUS
        ctx.fill(); // fill the whole circle

        ctx.font = '20px serif';
        ctx.textBaseline = "hanging";
        ctx.fillStyle = "white"
        ctx.fillText(this.live, this.x + this.radius * 2, this.y - this.radius / 2);

        // Draw the detection radius
        ctx.beginPath();
        ctx.strokeStyle = this.rangeColor;
        ctx.arc(this.x, this.y, this.detectionRadius, 0, Math.PI * 2); // X, Y, RADIUS
        ctx.stroke();

        ctx.drawImage(
            this.img, // sprite/image
            this.x - this.spriteWidth / 2, // sprite/image X position
            this.y - this.spriteHeight / 2, // sprite/image Y position
            this.spriteWidth, // sprite/image width
            this.spriteHeight // sprite/image height
        );
    }
}



function projectile_create(attacker, target) {
    let velocity_ = moveToEle(attacker, target);
    projectiles.push(new Projectile(
        attacker.x,
        attacker.y,
        {
            dx: velocity_.x * attacker.fireRate,
            dy: velocity_.y * attacker.fireRate,
        },
        8,
        attacker.projectileColor, // Use the new projectile color property
        attacker.id,
        attacker.damage,
        false
    ));
    attacker.Projectiles_fired++;
}

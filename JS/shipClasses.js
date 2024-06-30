//////////////////////////////////////////////////////////////////////////////////
// CREATE SHIP CLASSES
//////////////////////////////////////////////////////////////////////////////////

const shipClasses = [
    {
        // ship info
        name: "X-V1",
        src: "IMG/player/ufo-x-v1.png",
        playerLive: 100, // Health
        color: "#ff4600",
        playerSpeed_multyplier: 8, // Speed
        ship_width: 300,
        ship_height: 300,

        // normal gun
        fireRate: 10, // Fire rate
        speedRate: 8, // Speed rate
        ProjectileCoolDownTime: 50, // Cooldown
        damage_normalGun: 2, // Damage

        // smart missile
        big_ProjectileCoolDownTime: 1200, // Cooldown
        damage_BigGun: 10, // Damage

        // shield Cool down time
        shild_timeUp: 400, // Shield time up
        shild_cool_downTime: 1500, // Cooldown

        // player auto repair
        repair_time: 600, // Repair time

        UpGrade_cap: 6,

        // prices for upgrades
        gunUpgradePrice: 100,
        missileUpgradePrice: 200,
        sheildUpgradePrice: 150,
        repairUpgradePrice: 100
    },

    {
        // ship info
        name: "X-V2",
        src: "IMG/player/ufo-x-v2.png",
        playerLive: 150, // Health
        color: "#ab2f01",
        shipPrice: 5000,
        playerSpeed_multyplier: 9, // Speed
        ship_width: 300,
        ship_height: 300,

        // normal gun
        fireRate: 12, // Fire rate
        speedRate: 9, // Speed rate
        ProjectileCoolDownTime: 45, // Cooldown
        damage_normalGun: 4, // Damage

        // smart missile
        big_ProjectileCoolDownTime: 1000, // Cooldown
        damage_BigGun: 20, // Damage

        // shield Cool down time
        shild_timeUp: 500, // Shield time up
        shild_cool_downTime: 1300, // Cooldown

        // player auto repair
        repair_time: 500, // Repair time

        UpGrade_cap: 6,

        // prices for upgrades
        gunUpgradePrice: 200,
        missileUpgradePrice: 300,
        sheildUpgradePrice: 250,
        repairUpgradePrice: 200
    },

    {
        // ship info
        name: "X-V3",
        src: "IMG/player/ufo-x-v3.png",
        playerLive: 200, // Health
        color: "#9157ea",
        shipPrice: 10000,
        playerSpeed_multyplier: 10, // Speed
        ship_width: 300,
        ship_height: 300,

        // normal gun
        fireRate: 14, // Fire rate
        speedRate: 10, // Speed rate
        ProjectileCoolDownTime: 40, // Cooldown
        damage_normalGun: 6, // Damage

        // smart missile
        big_ProjectileCoolDownTime: 800, // Cooldown
        damage_BigGun: 30, // Damage

        // shield Cool down time
        shild_timeUp: 600, // Shield time up
        shild_cool_downTime: 1100, // Cooldown

        // player auto repair
        repair_time: 400, // Repair time

        UpGrade_cap: 5,

        // prices for upgrades
        gunUpgradePrice: 300,
        missileUpgradePrice: 600,
        sheildUpgradePrice: 500,
        repairUpgradePrice: 300
    },

    {
        // ship info
        name: "X-V4",
        src: "IMG/player/ufo-x-v4.png",
        playerLive: 300, // Health
        color: "#5507c1",
        shipPrice: 20000,
        playerSpeed_multyplier: 12, // Speed
        ship_width: 300,
        ship_height: 300,

        // normal gun
        fireRate: 16, // Fire rate
        speedRate: 11, // Speed rate
        ProjectileCoolDownTime: 35, // Cooldown
        damage_normalGun: 8, // Damage

        // smart missile
        big_ProjectileCoolDownTime: 600, // Cooldown
        damage_BigGun: 40, // Damage

        // shield Cool down time
        shild_timeUp: 700, // Shield time up
        shild_cool_downTime: 900, // Cooldown

        // player auto repair
        repair_time: 300, // Repair time

        UpGrade_cap: 4,

        // prices for upgrades
        gunUpgradePrice: 500,
        missileUpgradePrice: 800,
        sheildUpgradePrice: 700,
        repairUpgradePrice: 500
    }
];




//////////////////////////////////////////////////////////////////////////////////
// ENEMY SHIP CLASSES
//////////////////////////////////////////////////////////////////////////////////

let enemy_slow_upgrades = 0;
let enemy_fast_upgrades = 0;

const enemyClasses = {
    normal: {
        smart: false, // Indicates if the enemy is smart or not
        reward: 30, // Points or currency given when defeated
        able_to_turn_smart: false, // Indicates if the enemy can turn smart
        big_AbleToFire: false, // Indicates if the enemy has smart missiles
        vehicle_width: 300, // Width of the enemy's vehicle
        vehicle_height: 300, // Height of the enemy's vehicle
        fireRate: 7, // Rate at which the enemy fires
        fireMultiple: 5, // Multiplier for the fire rate
        cooldown_timer: 25, // Cooldown time between attacks
        velocity: 2, // Base speed of the enemy
        velocityMutilple: 3, // Multiplier for the velocity
        radius: 25, // Collision radius of the enemy
        live: 12, // Health points of the enemy
        type: "Grimepods", // Type or name of the enemy
        missileDefence: false, // Indicates if the enemy has missile defense
        rare: 1, // Rarity level of the enemy
        projectile_color: "rgb(167 111 51)", // Color of the enemy
        shipColor: "rgba(167, 111, 51, 0)", // Color of the enemy's ship
        rangeColor: "rgba(167, 111, 51, 0)", // Color of the enemy's range
        damage: 2, // Damage the enemy can inflict
        imgSrc: "IMG/enemy/normal-", // Image source for the enemy
        spawnSound: "SOUND/enemy_enter_sounds/proton1.mp3", // Sound played when the enemy spawns
        ammoIMG: {
            src: "IMG/enemy/n-missile-1.png", // Image source for the enemy's ammo
            width: 69, // Width of the ammo image
            height: 69 // Height of the ammo image
        }
    },
    speedy: {
        smart: false,
        reward: 40,
        able_to_turn_smart: false,
        big_AbleToFire: false,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 6, // Reduced from 8
        fireMultiple: 7,
        cooldown_timer: 20,
        velocity: 4,
        velocityMutilple: 5,
        radius: 25,
        live: 10,
        type: "Poisonseekers",
        missileDefence: false,
        rare: 2,
        projectile_color: "rgb(0 163 73)",
        shipColor: "rgba(0, 163, 73, 0)",
        rangeColor: "rgba(0, 163, 73, 0)",
        damage: 2,
        imgSrc: "IMG/enemy/fast-",
        spawnSound: "SOUND/enemy_enter_sounds/proton2.mp3",
        ammoIMG: {
            src: "IMG/enemy/f-missile-1.png",
            width: 69,
            height: 69
        }
    },
    harden: {
        smart: false,
        reward: 60,
        able_to_turn_smart: false,
        big_AbleToFire: false,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 10,
        fireMultiple: 6,
        cooldown_timer: 20,
        velocity: 1,
        velocityMutilple: 2,
        radius: 30,
        live: 20, 
        type: "Bonestepers",
        missileDefence: true,
        rare: 3,
        projectile_color: "rgb(141 133 127)",
        shipColor: "rgba(141, 133, 127, 0)",
        rangeColor: "rgba(141, 133, 127, 0)",
        damage: 3,
        imgSrc: "IMG/enemy/hard-",
        spawnSound: "SOUND/enemy_enter_sounds/proton3.mp3",
        ammoIMG: {
            src: "IMG/enemy/h-missile-1.png",
            width: 69,
            height: 69
        }
    },
    normal_smart: {
        smart: true,
        reward: 60, // Reduced from 70
        able_to_turn_smart: true,
        big_AbleToFire: false,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 12,
        fireMultiple: 5,
        cooldown_timer: 14,
        velocity: 2,
        velocityMutilple: 3,
        radius: 25,
        live: 25, // Reduced from 30
        type: "Stoneseekers",
        missileDefence: false,
        rare: 4,
        projectile_color: "rgb(167 111 51)",
        shipColor: "rgba(167, 111, 51, 0)",
        rangeColor: "rgba(167, 111, 51, 0)",
        damage: 2,
        imgSrc: "IMG/enemy/smart-normal-",
        spawnSound: "SOUND/enemy_enter_sounds/proton4.mp3",
        ammoIMG: {
            src: "IMG/enemy/n-missile-2.png",
            width: 69,
            height: 69
        }
    },
    speedy_smart: {
        smart: true,
        reward: 80,
        able_to_turn_smart: true,
        big_AbleToFire: false,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 12, // Reduced from 14
        fireMultiple: 7,
        cooldown_timer: 12,
        velocity: 4,
        velocityMutilple: 4,
        radius: 25,
        live: 20, // Reduced from 25
        type: "Shadefiends",
        missileDefence: false,
        rare: 5,
        projectile_color: "rgb(0 163 73)",
        shipColor: "rgba(0, 163, 73, 0)",
        rangeColor: "rgba(0, 163, 73, 0)",
        damage: 2,
        imgSrc: "IMG/enemy/smart-fast-",
        spawnSound: "SOUND/enemy_enter_sounds/proton5.mp3",
        ammoIMG: {
            src: "IMG/enemy/f-missile-2.png",
            width: 69,
            height: 69
        }
    },
    harden_smart: {
        smart: true,
        reward: 100,
        able_to_turn_smart: true,
        big_AbleToFire: false,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 14,
        fireMultiple: 9,
        cooldown_timer: 10,
        velocity: 2,
        velocityMutilple: 3,
        radius: 30,
        live: 40, // Reduced from 50
        type: "Vexboys",
        missileDefence: true,
        rare: 6,
        projectile_color: "rgb(141 133 127)",
        shipColor: "rgba(141, 133, 127, 0)",
        rangeColor: "rgba(141, 133, 127, 0)",
        damage: 4, // Reduced from 5
        imgSrc: "IMG/enemy/smart-hard-",
        spawnSound: "SOUND/enemy_enter_sounds/proton6.mp3",
        ammoIMG: {
            src: "IMG/enemy/h-missile-2.png",
            width: 69,
            height: 69
        }
    },
    agile_sniper: {
        smart: false,
        reward: 90,
        able_to_turn_smart: false,
        big_AbleToFire: false,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 18, // Reduced from 18
        fireMultiple: 15, // Reduced from 10
        cooldown_timer: 80,
        velocity: 3, // Reduced from 6
        velocityMutilple: 5,
        radius: 30,
        live: 15,
        type: "Agile Snipers",
        missileDefence: false,
        rare: 6,
        projectile_color: "rgba(255, 0, 0, 0.7)",
        shipColor: "rgba(255, 0, 0, 0)",
        rangeColor: "rgba(255, 0, 0, 0)",
        damage: 20,
        imgSrc: "IMG/enemy/fast-",
        spawnSound: "SOUND/enemy_enter_sounds/proton8.mp3",
        ammoIMG: {
            src: "IMG/enemy/a-missile.png",
            width: 69,
            height: 69
        }
    },
    armored_juggernaut: {
        smart: false,
        reward: 100, // Reduced from 120
        able_to_turn_smart: false,
        big_AbleToFire: false,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 8,
        fireMultiple: 4,
        cooldown_timer: 5,
        velocity: 1,
        velocityMutilple: 2,
        radius: 25,
        live: 50, // Reduced from 60
        type: "Armored Juggernaut",
        missileDefence: true,
        rare: 7,
        projectile_color: "rgb(0, 0, 255)",
        shipColor: "rgba(0, 0, 255, 0)",
        rangeColor: "rgba(0, 0, 255, 0)",
        damage: 6,
        imgSrc: "IMG/enemy/smart-hard-",
        spawnSound: "SOUND/enemy_enter_sounds/proton9.mp3",
        ammoIMG: {
            src: "IMG/enemy/j-missile.png",
            width: 69,
            height: 69
        }
    },
    stealth_assassin: {
        smart: true,
        reward: 110,
        able_to_turn_smart: true,
        big_AbleToFire: false,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 10, // Reduced from 20
        fireMultiple: 15,
        cooldown_timer: 15,
        velocity: 3,
        velocityMutilple: 4,
        radius: 25,
        live: 20,
        type: "Stealth Assassins",
        missileDefence: false,
        rare: 6,
        projectile_color: "rgb(75, 0, 130)",
        shipColor: "rgba(75, 0, 130, 0)",
        rangeColor: "rgba(75, 0, 130, 0)",
        damage: 1, // Reduced from 7
        imgSrc: "IMG/enemy/smart-fast-",
        spawnSound: "SOUND/enemy_enter_sounds/proton10.mp3",
        ammoIMG: {
            src: "IMG/enemy/s-missile.png",
            width: 69,
            height: 69
        }
    },
    boss: {
        smart: true,
        reward: 500,
        able_to_turn_smart: true,
        big_AbleToFire: true,
        vehicle_width: 300,
        vehicle_height: 300,
        fireRate: 16,
        fireMultiple: 9,
        cooldown_timer: 8,
        velocity: 2,
        velocityMutilple: 3.5,
        radius: 45,
        live: 100,
        type: "Gutfang",
        missileDefence: true,
        rare: 7,
        projectile_color: "rgba(255, 0, 0, 1)",
        shipColor: "rgba(255, 0, 0, 0)",
        rangeColor: "rgba(255, 0, 0, 0)",
        damage: 6,
        imgSrc: `IMG/enemy/boss-`,
        spawnSound: "SOUND/enemy_enter_sounds/proton7.mp3",
        ammoIMG: {
            src: "IMG/enemy/b-missile.png",
            width: 69,
            height: 69
        }
    }
};




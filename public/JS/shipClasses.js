//////////////////////////////////////////////////////////////////////////////////
// CREATE SHIP CLASSES
//////////////////////////////////////////////////////////////////////////////////

const shipClasses = [

    {

        // ship info
        name : "X-V1",
        src : "../IMG/player/ufo-x-v1.png",
        playerLive : 100,
        color : "#ff4600",
        playerSpeed_multyplier : 12,
        ship_width : 300,
        ship_height : 300,

        // normal gun
        fireRate : 16,
        speedRate : 12,
        ProjectileCoolDownTime : 58,
        damage_normalGun : 2,        

        // smart missile
        big_ProjectileCoolDownTime : 1200,
        damage_BigGun : 20,

        // shild Cool down time
        shild_timeUp : 400,
        shild_cool_downTime : 1500,

        // player auto repair 
        repair_time : 600,

        UpGrade_cap : 6,

        // prices for upgrades
        gunUpgradePrice : 150,
        missileUpgradePrice : 275,
        sheildUpgradePrice : 175,
        repairUpgradePrice : 150

    },

    // ship 2
    {

        // ship info
        name : "X-V2",
        src : "../IMG/player/ufo-x-v2.png",
        playerLive : 125,
        color : "#ab2f01",
        shipPrice : 7500,
        playerSpeed_multyplier : 16,
        ship_width : 300,
        ship_height : 300,

        // normal gun
        fireRate : 17,
        speedRate : 12,
        ProjectileCoolDownTime : 50,
        damage_normalGun : 4,        

        // smart missile
        big_ProjectileCoolDownTime : 1000,
        damage_BigGun : 40,

        // shild Cool down time
        shild_timeUp : 500,
        shild_cool_downTime : 1300,

        // player auto repair 
        repair_time : 500,

        UpGrade_cap : 6,

        // prices for upgrades
        gunUpgradePrice : 250,
        missileUpgradePrice : 375,
        sheildUpgradePrice : 300,
        repairUpgradePrice : 250



    },

    // ship 3
    {

        // ship info
        name : "X-V3",
        src : "../IMG/player/ufo-x-v3.png",
        playerLive : 150,
        color : "#9157ea",
        shipPrice : 15000,
        playerSpeed_multyplier : 20,
        ship_width : 300,
        ship_height : 300,

        // normal gun
        fireRate : 20,
        speedRate : 12,
        ProjectileCoolDownTime : 40,
        damage_normalGun : 6,        

        // smart missile
        big_ProjectileCoolDownTime : 800,
        damage_BigGun : 60,

        // shild Cool down time
        shild_timeUp : 600,
        shild_cool_downTime : 1100,

        // player auto repair 
        repair_time : 400,

        UpGrade_cap : 3,

        // prices for upgrades
        gunUpgradePrice : 500,
        missileUpgradePrice : 1000,
        sheildUpgradePrice : 1000,
        repairUpgradePrice : 500

    },

        // ship 4
    {

        // ship info
        name : "ufo-x-v4",
        src : "../IMG/player/ufo-x-v4.png",
        playerLive : 200,
        color : "#5507c1",
        shipPrice : 20000,
        playerSpeed_multyplier : 24,
        ship_width : 300,
        ship_height : 300,

        // normal gun
        fireRate : 22,
        speedRate : 12,
        ProjectileCoolDownTime : 36,
        damage_normalGun : 10,        

        // smart missile
        big_ProjectileCoolDownTime : 600,
        damage_BigGun : 100,

        // shild Cool down time
        shild_timeUp : 800,
        shild_cool_downTime : 800,

        // player auto repair 
        repair_time : 200,

        UpGrade_cap : 3,

        // prices for upgrades
        gunUpgradePrice : 750,
        missileUpgradePrice : 1250,
        sheildUpgradePrice : 1250,
        repairUpgradePrice : 750

    }

];


//////////////////////////////////////////////////////////////////////////////////
// ENEMY SHIP CLASSES
//////////////////////////////////////////////////////////////////////////////////

let enemy_slow_upgrades = 0;
let enemy_fast_upgrades = 0;

const enemyClasses = {

    normal : {
        
        smart : false,
        reward : 30 + enemy_fast_upgrades,
        able_to_turn_smart : false,
        vehicle_width : 300,
        vehicle_height : 300,

        fireRate : 10,
        fireMultiple : 5,
        cooldown_timer : 15,

        velocity : 3,
        velocityMutilple : 4,

        radius : 25,
        live : 10 + enemy_fast_upgrades,
        
        type : "Grimepods",
        missileDefence : false,
        rare : 1,
        color : "rgb(167 111 51)",

        damage : 1 + enemy_slow_upgrades,

        imgSrc :  "../IMG/enemy/normal-",

        spawnSound : "../SOUND/enemy_enter_sounds/proton1.mp3",

        //ammo type img
        ammoIMG : {
            src : "../IMG/enemy/n-missile-1.png",
            width : 69,
            height : 69
        }
        

    },

    speedy : {
        
        smart : false,
        reward : 30 + enemy_fast_upgrades,
        able_to_turn_smart : false,
        vehicle_width : 300,
        vehicle_height : 300,

        fireRate : 12,
        fireMultiple : 7,
        cooldown_timer : 12,

        velocity : 6,
        velocityMutilple : 6,

        radius : 20,
        live : 5 + enemy_fast_upgrades,

        type : "Poisonseekers",
        missileDefence : false,
        rare : 2,
        color : "rgb(0 163 73)",

        damage : 2 + enemy_slow_upgrades,

        imgSrc :  "../IMG/enemy/fast-",

        spawnSound : "../SOUND/enemy_enter_sounds/proton2.mp3",

        //ammo type img
        ammoIMG : {
            src : "../IMG/enemy/f-missile-1.png",
            width : 69,
            height : 69
        }

    },

    harden : {
        
        smart : false,
        reward : 55 + enemy_fast_upgrades,
        able_to_turn_smart : false,
        vehicle_width : 300,
        vehicle_height : 300,

        fireRate : 10,
        fireMultiple : 6,
        cooldown_timer : 10,

        velocity : 1,
        velocityMutilple : 2,

        radius : 30,
        live : 20 + enemy_fast_upgrades,

        type : "Bonestepers",
        missileDefence : true,
        rare : 3,
        color : "rgb(141 133 127)",

        damage : 3 + enemy_slow_upgrades,

        imgSrc :  "../IMG/enemy/hard-",

        spawnSound : "../SOUND/enemy_enter_sounds/proton3.mp3",

        //ammo type img
        ammoIMG : {
            src : "../IMG/enemy/h-missile-1.png",
            width : 69,
            height : 69
        }

    },

    //smart

    normal_smart : {
        
        smart : false,
        reward : 55 + enemy_fast_upgrades,
        able_to_turn_smart : true,
        vehicle_width : 300,
        vehicle_height : 300,

        fireRate : 12,
        fireMultiple : 5,
        cooldown_timer : 14,

        velocity : 4,
        velocityMutilple : 3,

        radius : 25,
        live : 15 + enemy_fast_upgrades,

        type : "Stoneseekers",
        missileDefence : false,
        rare : 4,
        color : "rgb(167 111 51)",

        damage : 2 + enemy_slow_upgrades,

        imgSrc :  "../IMG/enemy/smart-normal-",

        spawnSound : "../SOUND/enemy_enter_sounds/proton4.mp3",

        //ammo type img
        ammoIMG : {
            src : "../IMG/enemy/n-missile-2.png",
            width : 69,
            height : 69
        }

    },

    speedy_smart : {
        
        smart : false,
        reward : 55 + enemy_fast_upgrades,
        able_to_turn_smart : true,
        vehicle_width : 300,
        vehicle_height : 300,

        fireRate : 14,
        fireMultiple : 7,
        cooldown_timer : 8,

        velocity : 6,
        velocityMutilple : 5,

        radius : 20,
        live : 10 + enemy_fast_upgrades,

        type : "Shadefiends",
        missileDefence : false,
        rare : 5,
        color : "rgb(0 163 73)",

        damage : 4 + enemy_slow_upgrades,

        imgSrc :  "../IMG/enemy/smart-fast-",

        spawnSound : "../SOUND/enemy_enter_sounds/proton5.mp3",

        //ammo type img
        ammoIMG : {
            src : "../IMG/enemy/f-missile-2.png",
            width : 69,
            height : 69
        }

    },

    harden_smart : {
        
        smart : false,
        reward : 100 + enemy_fast_upgrades,
        able_to_turn_smart : true,
        vehicle_width : 300,
        vehicle_height : 300,

        fireRate : 14,
        fireMultiple : 7,
        cooldown_timer : 8,

        velocity : 2,
        velocityMutilple : 2,

        radius : 30,
        live : 40 + enemy_fast_upgrades,

        type : "Vexboys",
        missileDefence : true,
        rare : 6,
        color : "rgb(141 133 127)",

        damage : 4 + enemy_slow_upgrades,

        imgSrc :  "../IMG/enemy/smart-hard-",

        spawnSound : "../SOUND/enemy_enter_sounds/proton6.mp3",

        //ammo type img
        ammoIMG : {
            src : "../IMG/enemy/h-missile-2.png",
            width : 69,
            height : 69
        }

    },

    // BOSS

    boss : {
        
        smart : true,
        reward : 500 + enemy_fast_upgrades,
        able_to_turn_smart : true,
        vehicle_width : 300,
        vehicle_height : 300,

        fireRate : 16,
        fireMultiple : 9,
        cooldown_timer : 14,

        velocity : 3,
        velocityMutilple : 4,

        radius : 40,
        live : 100 + enemy_fast_upgrades,

        type : "Gutfang",
        missileDefence : true,
        rare : 7,
        color : "rgb(173,255,47)",

        damage : 6 + enemy_slow_upgrades,

        imgSrc :  `../IMG/enemy/boss-`,

        spawnSound : "../SOUND/enemy_enter_sounds/proton7.mp3",

        //ammo type img
        ammoIMG : {
            src : "../IMG/enemy/b-missile.png",
            width : 69,
            height : 69
        }

    }



};
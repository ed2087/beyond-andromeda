
console.log(

    "%cBEYOND/ANDROMEDA!","color:red;font-family:system-ui;font-size:3rem;-webkit-text-stroke: 1px black;font-weight:bold",
    
    
    `

    -------------------------------CONSTROLS----------------------------

        A/LEFT
        W/TOP
        S/DOWN
        D/RIGHT
        Q/MISSILE
        E/SHEILD


    ------------------------------PRODUCTION-------------------------------

    I WANT TO GIVE THANKS TO ALL THE PEOPLE THAT MADE THIS GAME POSSIBLE....

        PRODUCER            -- YO MAMA
        EXECUTIVE ASSISTANT -- YO MAMA
        SENIOR PRODUCER     -- YO MAMA
        GAME TESTER         -- SOKARIS
        STUDIO              -- YO MAMA STUDIOS INC


    ------------------------------FOR ANY COMPLAINT PLEASE CONTACT ME-------------------------------

        dont_care_about_your_complaints@yahoo.com

                        -OR-

        You can go out side your house and scream really loud and i will hear you...            
    

    ------------------------------COMMON ASKED QUESTION-------------------------------
        
        NO YOU CANNOT HAVE THE CODE! 
        YES THE EMAIL IS REAL!
        YES YOUR MOM DID HELP ME!
        YES I AM YELLING WHILE WRITING THIS!
        YES I DO KNOW I CAN'T SPELL!
        YES THERE ARE EASTER EGGS!

        For any other question please refer back to the email.....

    ------------------------------CREATOR-------------------------------

        EDGAR A ROBLEDO --- yes i am mexican, you racist...


    `
    
   

)

////////////////////////////////////////////////////////
//PLAYER GLOBAL VARIABLES
////////////////////////////////////////////////////////

let player = undefined;
let playerSpeed_multyplier = 10;
let move_direction = {

    y : 0,
    x : 0

};

//player anticheat
let trackMoney = 0;

// player game logic  
let playerScore = 0;
let gun_fire = audioFun("SOUND/player/gun/laser.ogg");
let sheild_sound = audioFun("SOUND/global/sheild-sound.mp3");

////////////////////////////////////////////////////////
//ENEMY GLOBAL VARIABLES
////////////////////////////////////////////////////////

let enemys = [];
let enemy_cap = 5;
let enemy_per_Level = 5;
let checkEnemy_TotalKillCount = 0;
let checkEnemy_TotalMoneyCount = 0;
let trackEnemy_Kills = 0;
let level_ = 1;
const SAFE_DISTANCE = 300; // Example safe distance in pixels
let currentChasingEnemy = null;

let enemy_gun_sound = audioFun("SOUND/global/enemy-gun-sound.mp3");
let enemy_missile_defence_sound = audioFun("SOUND/global/missile-defence-sound.mp3");
////////////////////////////////////////////////////////
//GAME GLOBAL VARIABLES
////////////////////////////////////////////////////////

//enmey spwan
let timeToNextspawn = 0; //this is the tick that will count to next spawn
let spawnInterval = 2000; //this is the time set for eveery spwan
let lastTime = 0;
let animationInfo = undefined;

//player/enemy functions fps
let fps_last = 0;
let fps_tick = 0;
let fps_next = 16;

let pauseGame = false;
let lockGameFun = false;

// game info

let textInfo = {
    text : undefined,
    x: undefined,
    y : undefined,
    color : undefined
}


//asteroid caps spawn

let asteroid_spawnInterval = 300;
let next_toSpawn = 0;


// boss background
let bossSound = audioFun("SOUND/enemy_enter_sounds/boss_music.mp3"); 
    bossSound.loop = true;
    
////////////////////////////////////////////////////////
//  BACKGROUNDS
////////////////////////////////////////////////////////
let backgroundClass = undefined;

let background_array = [
    "IMG/backgrounds/background-1.jpg",
    "IMG/backgrounds/background-2.jpg",
    "IMG/backgrounds/background-3.jpg",
    "IMG/backgrounds/background-4.jpg",
    "IMG/backgrounds/background-5.jpg",
    "IMG/backgrounds/background-6.jpg",
    "IMG/backgrounds/background-7.jpg"
];

class Background_ {
    constructor() {
        this.img = new Image();
        this.width = 8188;
        this.height = canvas.height;
        this.x = 0;
        this.y = 0;
        this.speed = 1;
        this.changeBackground();
    }

    changeBackground() {
        const randomIndex = Math.floor(Math.random() * background_array.length);
        this.img.src = background_array[randomIndex];
    }

    update() {
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.x = 0;
            this.changeBackground();
        }
    }

    draw() {
        // Draw the first background image
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // Draw the second background image next to the first one
        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);

        // If the first image is out of view, reset position
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }
}


backgroundClass = new Background_();



// stop audio and reset

const resetAudio =(audio) => {

    if(audio){
        audio.pause();
        audio.currentTime = 0;
    }

};
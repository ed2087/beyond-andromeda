///////////////////////////////////////////////
//    GLOBAL  VARIABLES / TOOLS
///////////////////////////////////////////////

const id_ = (id) => document.getElementById(id);
const cs_ = (cs) => document.getElementsByClassName(cs);
const csl_ = (csl) => document.querySelectorAll(csl);

//random
const getRandom_max_min = (max, min) => Math.floor(Math.random() * (max - min) + min);
const getRandom2_max_min = (max, min) => Math.random() * (max - min) + min;


// SHUFFLE ARRAY
const randomArrayShuffle = (array) => {

    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;

};

// new audio

const audioFun = (audio) => new Audio(audio);

//WRITE TO HTML

const writeHTML = (id, content) => {
    document.getElementById(id).innerHTML = content.toLocaleString();
};

const UpdateValue_html = (id, value) => {
    document.getElementById(id).value = value;
};

//RANDOM COLORS GENERATOR
const random_rgba = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};



function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}


///////////////////////////////////////////////
//    AUDIO FUNCTIONS
///////////////////////////////////////////////

const audioCtc = new AudioContext();

//creates audio that generates a tone

const createOscillator = () => {

    const oscillator = audioCtc.createOscillator();

          oscillator.connect(audioCtc.destination);//send to speakers

          oscillator.type = "sawtooth"; // sine, square, triangle, sawtooth

          oscillator.start();//create noise

          setTimeout(() => {
              oscillator.stop();
          },1000);



};


///////////////////////////////////////////////
//    CANVAS FUNCTIONS
///////////////////////////////////////////////

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const adjust = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// Adjust screen on resize
window.addEventListener("resize", adjust);

// Initial adjustment
adjust();


///////////////////////////////////////////////
//    FUNCTIONS THAT CHECK COLLITION/DISTANCE AND OTHER TOOLS RELATED TO GAMES OR MOVING OBJECTS
///////////////////////////////////////////////

//check distance frome circles using pythagorean Theorem
const checkDistance_pythagoreanTheorem = (ele1, ele2) => {

    //check 
    if(!ele1 || !ele2) return

    const dx = ele1.x - ele2.x;
    const dy = ele1.y - ele2.y;

    return Math.sqrt(dx * dx + dy * dy);

};


//check if ele hits wall

const wallCollition = (ele, multiple) => {   
    
    if(ele.type != "Gutfang"){
        if(ele.x + ele.radius * multiple >= canvas.width){       
            ele.velocity.dx = -ele.velocity.dx
        }
    
        if(ele.y + ele.radius * multiple  >= canvas.height){ 
            ele.velocity.dy = -ele.velocity.dy
        }
    
        if(ele.x - ele.radius * multiple  <= 0){
            ele.velocity.dx = -ele.velocity.dx        
        }
    
        if(ele.y - ele.radius * multiple  <= 0){
            ele.velocity.dy = -ele.velocity.dy
        }
    }       

};


const wallCollition_trufy = (ele, multiple) => {   
    
    let trufy = false;

    if(ele.x + ele.radius * multiple >= canvas.width){       
        trufy = true;
    }

    if(ele.y + ele.radius * multiple  >= canvas.height){ 
        trufy = true;
    }

    if(ele.x - ele.radius * multiple  <= 0){
        trufy = true;
    }

    if(ele.y - ele.radius * multiple  <= 0){
        trufy = true;
    }

    return trufy;

};



//find ele
const moveToEle = (ele1, ele2) => {

        //get angle 
        const body_ ={
            width : ele1.x - ele2.x,
            height : ele1.y -  ele2.y
        }

        const angle = Math.atan2(body_.height - (ele1.radius / 2), body_.width - (ele1.radius / 2));

        const velo = {
            x : Math.cos(angle),
            y: Math.sin(angle)
        }

        return {
            x : velo.x + velo.x,
            y : velo.y + velo.y 
        } 

}

const moveToSpot = (x, y, ele) => {

    const body_ ={
        width : x - ele.x,
        height : y - ele.y 
    }

    const angle = Math.atan2(body_.height - (ele.radius / 2), body_.width - (ele.radius / 2));

    const velo = {
        x : Math.cos(angle),
        y: Math.sin(angle)
    }

    return {
        x : velo.x + velo.x,
        y : velo.y + velo.y 
    } 

}


const ele2emyVSenemycollition = (ele1, ele2) => {   

    
        let vCollision = {x: ele2.x - ele1.x, y: ele2.y - ele1.y};    

        let distance = Math.sqrt((ele2.x-ele1.x)*(ele2.x-ele1.x) + (ele2.y-ele1.y)*(ele2.y-ele1.y));

        let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};

        let vRelativeVelocity = {x: ele1.velocity.dx - ele2.velocity.dx, y: ele1.velocity.dy - ele2.velocity.dy};
        let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y; 

        
        if(speed < 0) return 
        //take into acount mass 
        let impulse = 8 * speed / (ele1.radius + ele2.radius);
        ele1.velocity.dx += (impulse * ele2.radius * vCollisionNorm.x);
        ele1.velocity.dy += (impulse * ele2.radius * vCollisionNorm.y);
        ele2.velocity.dx -= (impulse * ele1.radius * vCollisionNorm.x);
        ele2.velocity.dy -= (impulse * ele1.radius * vCollisionNorm.y);

        console.log(impulse + " ----2")
        
       
};



// AUDIO FOR ALL 









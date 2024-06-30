
let interval_;
const startGame = () => {

    id_("main_UI").style.display = "none";

    let tick_ = 0;   
    lockGameFun = true;
    id_("announcements").style.display = "flex"; 
    id_("copyRight").style.display = "none";   

    interval_ = setInterval(() => {      

        // add a count timer

        tick_++;        
        id_("announcements").innerHTML = tick_ > 2 ? `Level ${level_}` :tick_;        

        if(tick_ <= 3){

            let start = audioFun("../SOUND/global/startAlarm.wav"); 
            start.play(); 

        }
        
        if(tick_ >= 4){
            clearInterval(interval_);
            lockGameFun = false; 
            pushEleToArray(1,100);//add firs level enemy
            shuffleArray();//shuffle enemy
            animate(0); 
            id_("announcements").style.display = "none"; 
            
        }

    },2000);
        

};

//startGame()


id_("start_game").addEventListener("click", startGame);


//////////////////////////////////////////////////////////////
//  THIS WILL PLAY A UI SOUND FOR ALL BUTTONS WITH THIS CLASS ON CLICK
/////////////////////////////////////////////////////////////


const playBUtton_UI = (e) => audioFun("../SOUND/global/button_ui.wav").play();
csl_(".global_buttonSound").forEach(btn => btn.addEventListener("click", playBUtton_UI));


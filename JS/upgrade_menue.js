
let gun_UpgradePrice = player.gun_UpgradePrice;
let missile_UpgradePrice = player.missile_UpgradePrice;
let sheild_UpgradePrice = player.sheild_UpgradePrice;
let repair_UpgradePrice = player.repair_UpgradePrice;


// close and open menu UI
const closeUI_menue = (e) => {

    id_("upgrade_ui_wrap").style.display = "none";
    pauseGame = false;
    animate(0); 
};

const openUI_menue = (e) => {
    
    id_("upgrade_ui_wrap").style.display = "inline-block";
    pauseGame = true;
    // add UI info
    id_("user_money").innerHTML = "$"+player.money; 

};


let gun_upgrades = 0;
const upgradeGun = () => {

        if(player.money >= gun_UpgradePrice){            
                
            if(gun_upgrades >= player.UpGrade_cap){
                
                    id_("gun_").innerHTML = "MAXED-OUT";

            }else{

                gun_upgrades++;
                player.money -= gun_UpgradePrice;
                trackMoney = player.money;
                gun_UpgradePrice += player.gun_UpgradePrice;

                player.fireRate++;
                player.ProjectileCoolDownTime--;
                player.damage_normalGun++;

                id_("gun_").innerHTML = "$"+gun_UpgradePrice;
                
            }

        };

        id_("user_money").innerHTML = "$"+player.money;
    
};


let missileUpgrades = 0;
const missileUpgrade = () => {

    if(player.money >= missile_UpgradePrice){            
                
        if(missileUpgrades >= player.UpGrade_cap){
            
                id_("missile_").innerHTML = "MAXED-OUT";

        }else{

            missileUpgrades++;

            player.money -= missile_UpgradePrice;
            trackMoney = player.money;
            missile_UpgradePrice += player.missile_UpgradePrice;

            player.big_ProjectileCoolDownTime -=50;
            player.damage_BigGun +=10;

            id_("missile_").innerHTML = "$"+missile_UpgradePrice;
            
        }

    };

    id_("user_money").innerHTML = "$"+player.money;

};

let sheildUpgrades = 0;
const sheildUpgrade = () => {

    if(player.money >= sheild_UpgradePrice){            
                
        if(sheildUpgrades >= player.UpGrade_cap){
            
                id_("sheild").innerHTML = "MAXED-OUT";

        }else{

            sheildUpgrades++;

            player.money -= sheild_UpgradePrice;
            trackMoney = player.money;
            sheild_UpgradePrice += player.sheild_UpgradePrice;

            player.shild_timeUp += 50;
            player.shild_cool_downTime -= 50;

            id_("sheild").innerHTML = "$"+sheild_UpgradePrice;
            
        }

    };

    id_("user_money").innerHTML = "$"+player.money;


};

let repairUpgrades = 0;
const repairUpgrade = () => {

    if(player.money >= repair_UpgradePrice){            
                
        if(repairUpgrades >= player.UpGrade_cap){
            
                id_("repair").innerHTML = "MAXED-OUT";

        }else{

            repairUpgrades++;

            player.money -= repair_UpgradePrice;
            trackMoney = player.money;
            repair_UpgradePrice += player.repair_UpgradePrice;

            player.repair_time -= 50;

            id_("repair").innerHTML = "$"+repair_UpgradePrice;

        }

    };

    id_("user_money").innerHTML = "$"+player.money;


};


let shipPrice_ = shipClasses[player.indexShip + 1].shipPrice;
let shipUpgrades = 0;
const shipUpgrade = () => {

    if(player.money >= shipPrice_){

        if(shipUpgrades >= shipClasses.length - 1){
            
                id_("ship_upgrade_button").innerHTML = "MAXED-OUT";

        }else{           

                      
            player.money -= shipPrice_;
            trackMoney = player.money;
            player.indexShip++;
            shipUpgrades++;

            // give new ship attrivutes
            player.img.src = shipClasses[player.indexShip].src;
            player.playerLive = shipClasses[player.indexShip].playerLive;
            player.playerLive_default = shipClasses[player.indexShip].playerLive;
            player.color = shipClasses[player.indexShip].color;
            player.spriteWidth = shipClasses[player.indexShip].ship_width / 4;
            player.spriteHeight = shipClasses[player.indexShip].ship_height / 4;

            // normal gun
            player.fireRate = shipClasses[player.indexShip].fireRate;
            player.speedRate = shipClasses[player.indexShip].speedRate;
            player.ProjectileCoolDownTime = shipClasses[player.indexShip].ProjectileCoolDownTime;
            player.damage_normalGun = shipClasses[player.indexShip].damage_normalGun;        

            // smart missile
            player.big_ProjectileCoolDownTime = shipClasses[player.indexShip].big_ProjectileCoolDownTime;
            player.damage_BigGun = shipClasses[player.indexShip].damage_BigGun;

            // shild Cool down time
            player.shild_timeUp = shipClasses[player.indexShip].shild_timeUp;
            player.shild_cool_downTime = shipClasses[player.indexShip].shild_cool_downTime;

            // player auto repair 
            player.repair_time = shipClasses[player.indexShip].repair_time;
            player.UpGrade_cap = shipClasses[player.indexShip].UpGrade_cap;                     

            // add new prices
            gun_UpgradePrice = shipClasses[player.indexShip].gunUpgradePrice;
            missile_UpgradePrice = shipClasses[player.indexShip].missileUpgradePrice;
            sheild_UpgradePrice = shipClasses[player.indexShip].sheildUpgradePrice;
            repair_UpgradePrice = shipClasses[player.indexShip].repairUpgradePrice;

            id_("gun_").innerHTML = "$"+gun_UpgradePrice;
            id_("missile_").innerHTML = "$"+missile_UpgradePrice;
            id_("sheild").innerHTML = "$"+sheild_UpgradePrice;
            id_("repair").innerHTML = "$"+repair_UpgradePrice;

            // reset caps ticks
            repairUpgrades = 0;
            sheildUpgrades = 0;
            gun_upgrades = 0;
            missileUpgrades = 0;


            player.update();
            player.draw();

            // set store for next buy
            if(shipUpgrades >= shipClasses.length - 1){
            
                id_("ship_upgrade_button").innerHTML = "MAXED-OUT";

            }else{

                id_("ship_img_ui").src = shipClasses[player.indexShip + 1].src;
                id_("ship_upgrade_button").innerHTML = "$"+shipClasses[player.indexShip + 1].shipPrice;//get next ship 

            }
            

        }

    };

    id_("user_money").innerHTML = "$"+player.money;


};



// add prices
id_("gun_").innerHTML = "$"+gun_UpgradePrice;
id_("missile_").innerHTML = "$"+missile_UpgradePrice;
id_("sheild").innerHTML = "$"+sheild_UpgradePrice;
id_("repair").innerHTML = "$"+repair_UpgradePrice;

id_("ship_img_ui").src = shipClasses[player.indexShip + 1].src;
id_("ship_upgrade_button").innerHTML = "$"+shipPrice_;

id_("close_UI").addEventListener("click", closeUI_menue);
id_("menue").addEventListener("click", openUI_menue);

id_("gun_").addEventListener("click", upgradeGun);
id_("missile_").addEventListener("click", missileUpgrade);
id_("sheild").addEventListener("click", sheildUpgrade);
id_("repair").addEventListener("click", repairUpgrade);
id_("ship_upgrade_button").addEventListener("click", shipUpgrade);
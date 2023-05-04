let isON = true;

const trufy_Particles = (e) => {

    if(isON){

        fps_particles_mutlple_check = 0.3;

        //html styles
        id_("onOff").innerHTML = "Low";
        id_("onOff").style.color = "red";
        id_("Particle_effect_btn").style.background = "rgb(81 48 0 / 75%)";
        isON = false;
    }else{

        fps_particles_mutlple_check = 2;

        //html styles
        id_("onOff").innerHTML = "High";
        id_("onOff").style.color = "rgb(75 255 0)";
        id_("Particle_effect_btn").style.background = "rgb(0 0 0 / 75%)";
        isON = true;
    }

}

id_("Particle_effect_btn").addEventListener("click",  trufy_Particles);
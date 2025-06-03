'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/

const rocket = 
[
    'images/rocket2.gif',
    'images/rocket3.gif'
]

const tailles = 
[
    'tiny',
    'normal',
    'big'
]


const timer = document.querySelector('#board span');
const departbouton = document.querySelector('#bouton-depart');
const rocketImage = document.querySelector('#rocket');
const reset = document.querySelector('#reset-bouton');
const stop = document.querySelector('#stop-bouton');

let state = 10;
let timeout;

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

function ondepartboutonClick()
{
    departbouton.disabled = true;
    departbouton.classList.add('disabled');
    stop.disabled = false;

    rocketImage.src = rocket[0];

    stop.addEventListener('click', onStopLaunch);

    launchRocket();
}

function launchRocket()
{
    state--;

    timer.innerHTML = state;

    if(state > 0)
    {
        timeout = setTimeout(launchRocket, 1000);
    }
    else
    {
        rocketImage.src = rocket[1];
        rocketImage.classList.add('tookOff');
        stop.removeEventListener('click', onStopLaunch);
        timer.innerHTML = state;
    }
}

function onReset(){
    clearTimeout(timeout);
    state = 10;
    timer.innerHTML = state;
    departbouton.disabled = false;
    rocketImage.classList.remove('tookOff');
    departbouton.classList.remove('disabled');
    rocketImage.src = 'images/rocket1.png';
}

function onStopLaunch(){
    clearTimeout(timeout);
    departbouton.classList.remove('disabled');
    stop.disabled = true;
    stop.removeEventListener('click', onStopLaunch);
}

function GenerationEtoile(count){
    for(let i = 0; i < count; i++){

        let etoile = document.createElement('div');

        etoile.classList.add('star');
        etoile.classList.add(tailles[Math.floor(Math.random() * tailles.length)]);

        etoile.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
        etoile.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
        let main = document.querySelector('main');
        main.appendChild(etoile);
    }
}

/************************************************************************************/
/* ******************************** CODE PRINCIPAL **********************************/
/************************************************************************************/

timer.innerHTML = state;

departbouton.addEventListener('click', ondepartboutonClick);
reset.addEventListener('click', onReset);

window.addEventListener('DOMContentLoaded', () => {
    GenerationEtoile(150);
});

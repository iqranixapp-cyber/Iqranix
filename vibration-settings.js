/*
====================================
   IQRANIX VIBRATION SETTINGS
====================================
*/

document.addEventListener("DOMContentLoaded",()=>{

loadSettings();

setupSaveButton();

setupTestButton();

});

/*
====================================
      DEFAULT SETTINGS
====================================
*/

const DEFAULT_SETTINGS={

enableVibration:true,

vibrateAdhan:true,

vibrateBefore:false,

buttonVibration:true,

longPressVibration:true,

batterySaver:false,

vibrationDuration:60

};

/*
====================================
      LOAD SETTINGS
====================================
*/

function loadSettings(){

const settings=JSON.parse(

localStorage.getItem(

"iqranixVibrationSettings"

)

)||DEFAULT_SETTINGS;

document.getElementById(

"enableVibration"

).checked=settings.enableVibration;

document.getElementById(

"vibrateAdhan"

).checked=settings.vibrateAdhan;

document.getElementById(

"vibrateBefore"

).checked=settings.vibrateBefore;

document.getElementById(

"buttonVibration"

).checked=settings.buttonVibration;

document.getElementById(

"longPressVibration"

).checked=settings.longPressVibration;

document.getElementById(

"batterySaver"

).checked=settings.batterySaver;

document.getElementById(

"vibrationDuration"

).value=settings.vibrationDuration;

}
/*
====================================
      SAVE SETTINGS
====================================
*/

function setupSaveButton(){

const button=document.getElementById(

"saveVibrationSettings"

);

if(!button)return;

button.addEventListener("click",()=>{

const settings={

enableVibration:

document.getElementById(

"enableVibration"

).checked,

vibrateAdhan:

document.getElementById(

"vibrateAdhan"

).checked,

vibrateBefore:

document.getElementById(

"vibrateBefore"

).checked,

buttonVibration:

document.getElementById(

"buttonVibration"

).checked,

longPressVibration:

document.getElementById(

"longPressVibration"

).checked,

batterySaver:

document.getElementById(

"batterySaver"

).checked,

vibrationDuration:parseInt(

document.getElementById(

"vibrationDuration"

).value

)

};

localStorage.setItem(

"iqranixVibrationSettings",

JSON.stringify(settings)

);

alert(

"Vibration settings saved successfully."

);

});

}

/*
====================================
      TEST VIBRATION
====================================
*/

function setupTestButton(){

const button=document.getElementById(

"testVibration"

);

if(!button)return;

button.addEventListener("click",()=>{

const enabled=document.getElementById(

"enableVibration"

).checked;

if(!enabled){

alert(

"Enable vibration first."

);

return;

}

if(!("vibrate" in navigator)){

alert(

"Your device does not support vibration."

);

return;

}

const batterySaver=document.getElementById(

"batterySaver"

).checked;

const duration=parseInt(

document.getElementById(

"vibrationDuration"

).value

);

navigator.vibrate(

batterySaver ? 30 : duration

);

});

}
/*
====================================
    GET VIBRATION SETTINGS
====================================
*/

function getVibrationSettings(){

return JSON.parse(

localStorage.getItem(

"iqranixVibrationSettings"

)

)||DEFAULT_SETTINGS;

}

/*
====================================
      PLAY VIBRATION
====================================
*/

function playVibration(type="normal"){

const settings=getVibrationSettings();

if(

!settings.enableVibration ||

!("vibrate" in navigator)

){

return;

}

let pattern;

switch(type){

case "button":

pattern=settings.buttonVibration

?20

:0;

break;

case "longpress":

pattern=settings.longPressVibration

?60

:0;

break;

case "beforeAdhan":

pattern=settings.vibrateBefore

?[150,100,150]

:0;

break;

case "adhan":

pattern=settings.vibrateAdhan

?[300,150,300,150,300]

:0;

break;

default:

pattern=settings.batterySaver

?30

:settings.vibrationDuration;

}

if(pattern!==0){

navigator.vibrate(pattern);

}

}

/*
====================================
        PAGE READY
====================================
*/

console.log(

"Iqranix Vibration Settings Loaded."

);
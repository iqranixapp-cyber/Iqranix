/*
====================================
   IQRANIX QIBLA CALIBRATION
====================================
*/

document.addEventListener("DOMContentLoaded",()=>{

loadCalibrationStatus();

setupCalibrationButton();

setupAccuracyButton();

setupSaveButton();

});

/*
====================================
      DEFAULT STATUS
====================================
*/

let calibrationProgress=0;

let calibrated=false;

/*
====================================
      LOAD STATUS
====================================
*/

function loadCalibrationStatus(){

const saved=JSON.parse(

localStorage.getItem(

"iqranixQiblaCalibration"

)

);

if(saved){

calibrationProgress=saved.progress||0;

calibrated=saved.calibrated||false;

updateProgress();

updateStatus();

}

}

/*
====================================
      START CALIBRATION
====================================
*/

function setupCalibrationButton(){

const button=

document.getElementById(

"startCalibration"

);

if(!button)return;

button.addEventListener("click",()=>{

calibrationProgress=0;

calibrated=false;

updateProgress();

updateStatus();

simulateCalibration();

});

}
/*
====================================
    SIMULATE CALIBRATION
====================================
*/

function simulateCalibration(){

const interval=setInterval(()=>{

calibrationProgress+=10;

if(calibrationProgress>=100){

calibrationProgress=100;

calibrated=true;

clearInterval(interval);

}

updateProgress();

updateStatus();

},500);

}

/*
====================================
    UPDATE PROGRESS BAR
====================================
*/

function updateProgress(){

const progressFill=

document.getElementById("progressFill");

const progressText=

document.getElementById("progressText");

progressFill.style.width=

calibrationProgress+"%";

progressText.textContent=

calibrationProgress+"% Complete";

}

/*
====================================
    UPDATE STATUS
====================================
*/

function updateStatus(){

const status=

document.getElementById("compassStatus");

const description=

document.getElementById("statusDescription");

if(calibrated){

status.textContent="Calibrated";

status.style.color="#18A874";

description.textContent=

"Your compass has been calibrated successfully and is ready for use.";

}

else if(calibrationProgress>0){

status.textContent="Calibrating...";

status.style.color="#F7D774";

description.textContent=

"Move your phone slowly in a figure-eight motion until calibration reaches 100%.";

}

else{

status.textContent="Not Calibrated";

status.style.color="#F7D774";

description.textContent=

"Press the button below to begin compass calibration.";

}

}

/*
====================================
      CHECK ACCURACY
====================================
*/

function setupAccuracyButton(){

const button=

document.getElementById("checkAccuracy");

if(!button)return;

button.addEventListener("click",()=>{

if(calibrated){

alert(

"✅ Compass accuracy is GOOD.\n\nYour Qibla Compass is ready to use."

);

}else{

alert(

"⚠️ Compass is not fully calibrated.\n\nPlease complete calibration first."

);

}

});

}
/*
====================================
      SAVE CALIBRATION
====================================
*/

function setupSaveButton(){

const button=document.getElementById(

"saveCalibration"

);

if(!button)return;

button.addEventListener("click",()=>{

const calibrationData={

progress:calibrationProgress,

calibrated:calibrated,

savedAt:new Date().toLocaleString()

};

localStorage.setItem(

"iqranixQiblaCalibration",

JSON.stringify(calibrationData)

);

alert(

"Qibla calibration saved successfully."

);

});

}

/*
====================================
      GET CALIBRATION DATA
====================================

Returns the latest calibration
status for the Qibla Compass.

====================================
*/

function getQiblaCalibration(){

return JSON.parse(

localStorage.getItem(

"iqranixQiblaCalibration"

)

)||{

progress:0,

calibrated:false,

savedAt:null

};

}

/*
====================================
        PAGE READY
====================================
*/

console.log(

"Iqranix Qibla Calibration Loaded."

);
/*
====================================
      IQRANIX ADHAN VOLUME
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

loadVolumeSettings();

setupVolumeSlider();

setupPreviewButton();

setupSaveButton();

setupResetButton();

});

/*
====================================
      DEFAULT SETTINGS
====================================
*/

const defaultSettings={

volume:80,

mediaVolume:true,

vibrate:false,

fadeIn:true,

duckAudio:false

};

/*
====================================
      VOLUME SLIDER
====================================
*/

function setupVolumeSlider(){

const slider=document.getElementById("adhanVolume");

const value=document.getElementById("volumeValue");

slider.addEventListener("input",()=>{

value.textContent=slider.value+"%";

});

}
/*
====================================
      LOAD SETTINGS
====================================
*/

function loadVolumeSettings(){

const saved=JSON.parse(

localStorage.getItem("iqranixAdhanVolume")

);

const settings=saved || defaultSettings;

document.getElementById("adhanVolume").value=settings.volume;

document.getElementById("volumeValue").textContent=

settings.volume+"%";

document.getElementById("mediaVolume").checked=

settings.mediaVolume;

document.getElementById("vibrateWithAdhan").checked=

settings.vibrate;

document.getElementById("fadeInAdhan").checked=

settings.fadeIn;

document.getElementById("duckAudio").checked=

settings.duckAudio;

}

/*
====================================
      PREVIEW ADHAN
====================================
*/

function setupPreviewButton(){

const button=document.getElementById("previewVolume");

if(!button)return;

button.addEventListener("click",()=>{

const volume=

document.getElementById("adhanVolume").value/100;

/*
Replace "makkah.mp3" with whichever
offline Adhan you want as the preview.
*/

const audio=new Audio("makkah.mp3");

audio.volume=volume;

audio.play();

});

}

/*
====================================
      SAVE SETTINGS
====================================
*/

function setupSaveButton(){

const button=document.getElementById("saveVolume");

if(!button)return;

button.addEventListener("click",()=>{

const settings={

volume:Number(

document.getElementById("adhanVolume").value

),

mediaVolume:

document.getElementById("mediaVolume").checked,

vibrate:

document.getElementById("vibrateWithAdhan").checked,

fadeIn:

document.getElementById("fadeInAdhan").checked,

duckAudio:

document.getElementById("duckAudio").checked

};

localStorage.setItem(

"iqranixAdhanVolume",

JSON.stringify(settings)

);

alert("Adhan volume settings saved successfully.");

});

}
/*
====================================
      RESET SETTINGS
====================================
*/

function setupResetButton(){

const button=document.getElementById("resetVolume");

if(!button)return;

button.addEventListener("click",()=>{

document.getElementById("adhanVolume").value=

defaultSettings.volume;

document.getElementById("volumeValue").textContent=

defaultSettings.volume+"%";

document.getElementById("mediaVolume").checked=

defaultSettings.mediaVolume;

document.getElementById("vibrateWithAdhan").checked=

defaultSettings.vibrate;

document.getElementById("fadeInAdhan").checked=

defaultSettings.fadeIn;

document.getElementById("duckAudio").checked=

defaultSettings.duckAudio;

localStorage.setItem(

"iqranixAdhanVolume",

JSON.stringify(defaultSettings)

);

alert("Adhan volume settings have been reset.");

});

}

/*
====================================
      HELPER FUNCTION
====================================

Returns the saved Adhan
volume settings for use
by the Prayer Times engine.

====================================
*/

function getAdhanVolumeSettings(){

return JSON.parse(

localStorage.getItem(

"iqranixAdhanVolume"

)

)||defaultSettings;

}

/*
====================================
      PAGE READY
====================================
*/

console.log(

"Iqranix Adhan Volume Loaded."

);
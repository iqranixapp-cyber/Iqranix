/*
====================================
   IQRANIX LOCATION PERMISSION
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeLocation();

    setupRequestButton();

    setupRefreshButton();

    setupSaveButton();

});

/*
====================================
      INITIALIZE
====================================
*/

function initializeLocation(){

    updatePermissionStatus("Not Checked");

}

/*
====================================
   UPDATE STATUS DISPLAY
====================================
*/

function updatePermissionStatus(status){

    const statusElement =
    document.getElementById("permissionStatus");

    const description =
    document.getElementById("statusDescription");

    statusElement.textContent = status;

    switch(status){

        case "Allowed":

            description.textContent =
            "Location access has been granted.";

            break;

        case "Denied":

            description.textContent =
            "Location access has been denied. Enable it from your browser or device settings.";

            break;

        default:

            description.textContent =
            "Tap the button below to request location permission.";

    }

}

/*
====================================
 REQUEST LOCATION PERMISSION
====================================
*/

function setupRequestButton(){

    const button =
    document.getElementById("requestLocation");

    if(!button) return;

    button.addEventListener("click", () => {

        if(!navigator.geolocation){

            alert(
                "Geolocation is not supported on this device."
            );

            return;

        }

        navigator.geolocation.getCurrentPosition(

            onLocationSuccess,

            onLocationError,

            {

                enableHighAccuracy:true,

                timeout:15000,

                maximumAge:0

            }

        );

    });

}
/*
====================================
     LOCATION SUCCESS
====================================
*/

function onLocationSuccess(position){

updatePermissionStatus("Allowed");

const latitude=position.coords.latitude;

const longitude=position.coords.longitude;

const accuracy=Math.round(position.coords.accuracy);

document.getElementById("latitude").textContent=

latitude.toFixed(6);

document.getElementById("longitude").textContent=

longitude.toFixed(6);

document.getElementById("accuracy").textContent=

accuracy+" m";

document.getElementById("lastUpdated").textContent=

new Date().toLocaleString();

}

/*
====================================
      LOCATION ERROR
====================================
*/

function onLocationError(error){

updatePermissionStatus("Denied");

switch(error.code){

case error.PERMISSION_DENIED:

alert(

"Location permission was denied."

);

break;

case error.POSITION_UNAVAILABLE:

alert(

"Unable to determine your location."

);

break;

case error.TIMEOUT:

alert(

"Location request timed out."

);

break;

default:

alert(

"An unknown location error occurred."

);

}

}

/*
====================================
     REFRESH LOCATION
====================================
*/

function setupRefreshButton(){

const button=

document.getElementById("refreshLocation");

if(!button)return;

button.addEventListener("click",()=>{

navigator.geolocation.getCurrentPosition(

onLocationSuccess,

onLocationError,

{

enableHighAccuracy:true,

timeout:15000,

maximumAge:0

}

);

});

}
/*
====================================
      SAVE PREFERENCE
====================================
*/

function setupSaveButton(){

const button=document.getElementById("saveLocationSettings");

if(!button)return;

button.addEventListener("click",()=>{

const locationData={

permission:

document.getElementById("permissionStatus").textContent,

latitude:

document.getElementById("latitude").textContent,

longitude:

document.getElementById("longitude").textContent,

accuracy:

document.getElementById("accuracy").textContent,

lastUpdated:

document.getElementById("lastUpdated").textContent

};

localStorage.setItem(

"iqranixLocationSettings",

JSON.stringify(locationData)

);

alert(

"Location preference saved successfully."

);

});

}

/*
====================================
      GET LOCATION DATA
====================================

Returns the latest saved
location information for use by:

• Prayer Times
• Qibla Compass
• Nearby Mosques
• Islamic Events

====================================
*/

function getSavedLocation(){

return JSON.parse(

localStorage.getItem(

"iqranixLocationSettings"

)

)||null;

}

/*
====================================
      PAGE READY
====================================
*/

console.log(

"Iqranix Location Permission Loaded."

);
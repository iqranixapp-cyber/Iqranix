/*
====================================
        IQRANIX MADHHAB
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    loadMadhhab();

    setupSaveButton();

});

/*
====================================
        SAVE MADHHAB
====================================
*/

function setupSaveButton(){

    const saveButton = document.getElementById("saveMadhhab");

    saveButton.addEventListener("click", () => {

        const selected = document.querySelector(
            'input[name="madhhab"]:checked'
        );

        if(!selected){

            alert("Please select a Madhhab.");

            return;

        }

        localStorage.setItem(

            "iqranixMadhhab",

            selected.value

        );

        alert(

            "Your Madhhab preference has been saved successfully."

        );

    });

}
/*
====================================
        LOAD MADHHAB
====================================
*/

function loadMadhhab(){

    const savedMadhhab = localStorage.getItem("iqranixMadhhab");

    if(!savedMadhhab){

        document.querySelector(
            'input[value="shafii"]'
        ).checked = true;

        return;

    }

    const option = document.querySelector(

        `input[value="${savedMadhhab}"]`

    );

    if(option){

        option.checked = true;

    }

}

/*
====================================
    GET CURRENT MADHHAB
====================================

This helper function will be used later
by the Prayer Times engine to determine
how Asr should be calculated.

Returns:
- "shafii"
- "hanafi"

====================================
*/

function getSelectedMadhhab(){

    return localStorage.getItem(

        "iqranixMadhhab"

    ) || "shafii";

}

/*
====================================
      READY
====================================
*/

console.log(

    "Iqranix Madhhab Settings Loaded."

);
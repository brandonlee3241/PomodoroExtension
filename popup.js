// DOM loader
document.addEventListener("DOMContentLoaded", function () {

    // set the default duration to 5 seconds
    let default_dur = document.getElementById("timer").value = 5;

    // Listen for start button click
    document.getElementById("start").addEventListener("click", function () {
        // tell background.js it was clicked

        let duration = document.getElementById("timer").value;
        chrome.runtime.sendMessage({ duration: duration, action: "startTimer" });
    })

     // Listen for stop button click
     document.getElementById("stop").addEventListener("click", function () {
        console.log("stop button clicked");

        chrome.runtime.sendMessage({ action: "stopTimer" });
    });
    
    // Listen for reset button click
    document.getElementById("reset").addEventListener("click", function () {
        console.log("reset button clicked");

        chrome.runtime.sendMessage({ action: "resetTimer", duration: default_dur });
        // reset display to default

    });

    // Listen for updateTimer message from background.js
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === "updateTimer") {
            document.getElementById("timer").value = request.rawTime;
            document.getElementById("timer").textContent = request.time;
        }
    });

   
});



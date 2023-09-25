// DOM loader
document.addEventListener("DOMContentLoaded", function () {

    // set the duration to 25 minutes
    document.getElementById("timer").value = 5;

    // Listen for start button click
    document.getElementById("start").addEventListener("click", function () {
        // tell background.js it was clicked

        let duration = document.getElementById("timer").value;
        chrome.runtime.sendMessage({ duration: duration, action: "startTimer" });
    })

    // Listen for updateTimer message from background.js
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === "updateTimer") {
            document.getElementById("timer").textContent = request.time;
        }
    });

    // Listen for stop button click
    document.getElementById("stop").addEventListener("click", function () {
        // tell background.js it was clicked
        console.log("stop button clicked");
        chrome.runtime.sendMessage({ action: "stopTimer" });
    });
});



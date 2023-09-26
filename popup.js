// DOM loader
document.addEventListener("DOMContentLoaded", function () {

    // set the default duration to 5 seconds
    let default_dur = document.getElementById("timer").value = 25*60;
    const timerButtons = document.querySelectorAll(".btn-group-container-fluid input[type='radio']");
    

    // Listen for start button click
    document.getElementById("start").addEventListener("click", function () {
        let duration = document.getElementById("timer").value;
        document.getElementById("start").setAttribute("disabled","true");
        timerButtons.forEach(button=>button.setAttribute("disabled","true"));
        chrome.runtime.sendMessage({ duration: duration, action: "startTimer" });
    });

     // Listen for stop button click
     document.getElementById("stop").addEventListener("click", function () {
        document.getElementById("start").removeAttribute("disabled");
        timerButtons.forEach(button=>button.removeAttribute("disabled"));
        chrome.runtime.sendMessage({ action: "stopTimer" });
    });
    
    // Listen for reset button click
    document.getElementById("reset").addEventListener("click", function () {
     
        document.getElementById("btnradio1").checked = true;
        document.getElementById("start").removeAttribute("disabled");
        timerButtons.forEach(button=>button.removeAttribute("disabled"));
        chrome.runtime.sendMessage({ action: "resetTimer", duration: default_dur });


    });

    // Listen for updateTimer message from background.js
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === "updateTimer") {
            document.getElementById("timer").value = request.rawTime;
            document.getElementById("timer").textContent = request.time;
        }
    
    });

    
    // Listen for timer buttons to set the timer
    document.getElementById("btnradio1").addEventListener("click", function () {
        console.log("25 min button clicked");
        document.getElementById("timer").value = 25*60;
        chrome.runtime.sendMessage({ action: "25m",duration: 25*60});
    });
    document.getElementById("btnradio2").addEventListener("click", function () {
        console.log("45 min button clicked");
        document.getElementById("timer").value = 45*60;
        chrome.runtime.sendMessage({ action: "45m",duration: 45*60});
    });
    document.getElementById("btnradio3").addEventListener("click", function () {
        console.log("60 min button clicked");
        document.getElementById("timer").value = 60*60;
        chrome.runtime.sendMessage({ action: "60m",duration: 60*60});
    });
   
});



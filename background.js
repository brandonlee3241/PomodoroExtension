


// start the timer in the background, continuously feeding the popup.js with the time remaining
let timerId;
let timeRemaining = 0;

function startTimer(timeRemaining){
    timerId = setInterval(function(){
        timeRemaining--;
        console.log("time remaining: " + timeRemaining + " seconds");
        sendTimeRemaining(timeRemaining);
        if(timeRemaining === 0){
            console.log("timer is done");
            stopTimer(timeRemaining);
        }
    }, 1000);
};

function stopTimer(){
    clearInterval(timerId);
    console.log("time remaining: " + timeRemaining + " seconds");
};

// sends the time remaining to popup.js to update display
function sendTimeRemaining(timeRemaining){
    let rawTime = timeRemaining;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    chrome.runtime.sendMessage({action: "updateTimer",rawTime:rawTime, time: `${minutes}:${seconds.toString().padStart(2, "0")}`});
};



// listen for message from popup.js to start
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if(request.action === "startTimer"){
        // start timer
        startTimer(request.duration);
    }
    else if(request.action === "stopTimer"){
        console.log("stop timer heard from background");
        stopTimer();
    }
    else if(request.action === "resetTimer"){
        console.log("reset timer heard from background");
        sendTimeRemaining(request.duration);
    }
});
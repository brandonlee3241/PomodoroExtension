


// start the timer in the background, continuously feeding the popup.js with the time remaining
let timerId;
let timeRemaining = 0;


function startTimer(timeRemaining){
    timerId = setInterval(function(){
        timeRemaining-=0.1;
   
        console.log("time remaining: " + timeRemaining + " seconds");
        let buttonStatus = true;
        // cut off decimal places from the return
        sendTimeRemaining(timeRemaining.toFixed(0));
        sendButtonStatus(buttonStatus);
        if(timeRemaining === 0){
            console.log("timer is done");
            stopTimer(timeRemaining);
        }
    }, 100);
};

function stopTimer(){
    console.log("Clearing interval");
    clearInterval(timerId);
};

function sendButtonStatus(buttonStatus){
    chrome.runtime.sendMessage({action: "updateButton", buttonStatus: buttonStatus});
};
// sends the time remaining to popup.js to update display
function sendTimeRemaining(timeRemaining, buttonStatus){
    let rawTime = timeRemaining;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    chrome.runtime.sendMessage({action: "updateTimer",rawTime:rawTime, time: `${minutes}:${seconds.toString().padStart(2, "0")}`});
};

function resetTimer(){
    clearInterval(timerId);
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
        
        resetTimer();
    }

    // cases for timer buttons
    if(request.action === "25m"){
        console.log("25 min button clicked");
        sendTimeRemaining(request.duration);
    }
    else if(request.action === "45m"){
        console.log("45 min button clicked");
        sendTimeRemaining(request.duration);
    }
    else if(request.action === "60m"){
        console.log("60 min button clicked");
        sendTimeRemaining(request.duration);
    }
});
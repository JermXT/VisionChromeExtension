
console.log('background running');
let date = new Date;

console.log(date.getHours());
let timerLength, breakLength, startTime, timerOn = false, startSnowAnimation, timedSnowAnimation, breakTime = false, timeLeft, ticker, tickerFunction

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //testing code
        if (request.testing == true) {
            snowAnimation();
            sendResponse({ "timeleft": "hi" })

        }
        //
        if (request.getData == true) {
            // update timer
            if (timerOn) {
                //let timeElapsed = (date.getDay() * 24 * 60 * 60 + date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) - startTime;
                
                //console.log(date.getDay() * 24 * 60 * 60 + date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds())

                timeLeft = timerLength * 60 - ticker
                console.log("timeLeft: "+ timeLeft)
                sendResponse({ "timeleft": timeLeft, "timerOn": true, "breaktime": breakTime })

            } else {
                sendResponse({ "timeleft": timeLeft, "timerOn": false, "breaktime": false })
            }
            
            
        } else {
            if (request.reset == true) {
                //start timer
                timerLength = request.timerLength
                breakLength = request.breakLength
                ticker = 0
                tickerFunction = setInterval(function(){ticker +=1}, 1000)
                //startTime = date.getDay() * 24 * 60 * 60 + date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()
                
                timerOn = true
                startSnowAnimation = setTimeout(snowAnimation, timerLength*1000*60)
                sendResponse({ "timeleft": timerLength, "timerOn": true, "breaktime": false})
            }else if(request.timerOn == false){
                //shut down timer
                timerOn = false
                breakTime = false
                clearInterval(tickerFunction)
                clearTimeout(timedSnowAnimation)//timer till snow animation
                clearTimeout(startSnowAnimation)//timer of snow animation
            }
            /*
            if (timerOn) {
                let timeElapsed = (date.getDay() * 24 * 60 * 60 + date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) - startTime;


                timeLeft = timerLength * 60 - timeElapsed

                sendResponse({ "timeleft": timeLeft, "timerOn": true, "breaktime": breakTime })

            } else {
                sendResponse({ "timeleft": timeLeft, "timerOn": false, "breaktime": false })
            }*/
        }
    });
function snowAnimation() {
    timedSnowAnimation = setTimeout(stopAnimation, breakLength*1000*60);
    messageContent({ "animation": true })
    breakTime = true
    console.log("sent")
}
function stopAnimation() {
    messageContent({ "animation": false })
    startSnowAnimation = setTimeout(snowAnimation, timerLength * 1000 * 60)
    breakTime = false

}

//{animation:true/false}
//true to start it, falst to stop it
function messageContent(message) {
    let params = {
        active: true
        //currentWindow: true
    }
    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        console.log("got tabs");
        console.log(tabs);
        // send a message to the content script


        for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, message);

        }
    }
}
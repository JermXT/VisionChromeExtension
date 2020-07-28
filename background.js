
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
                if(breakTime){
                    
                    timeLeft = breakLength * 60 - ticker
                    console.log("breaktime: "+breakTime+" "+timeLeft)
                    sendResponse({ "timeleft": timeLeft, "timerOn": true, "breakTime": breakTime })
                }else{
                    timeLeft = timerLength * 60 - ticker
                    console.log("studytime: "+ timeLeft)
                    sendResponse({ "timeleft": timeLeft, "timerOn": true, "breakTime": breakTime })
                }
            } else {
                sendResponse({ "timeleft": timeLeft, "timerOn": false, "breakTime": false })
            }
            
            
        } else {
            if (request.reset == true) {
                //start timer
                timerLength = request.timerLength-0.75    /// undo both the - 0,75 cus it derp things
                breakLength = request.breakLength-0.75      
                
                ticker = 0
                clearInterval(tickerFunction);
                tickerFunction = setInterval(function(){ticker +=1}, 1000)
                //startTime = date.getDay() * 24 * 60 * 60 + date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()
                console.log("truereset")
                timerOn = true
                startSnowAnimation = setTimeout(snowAnimation, timerLength*1000*60)
                sendResponse({ "timeleft": timerLength*60, "timerOn": true, "breakTime": false})
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
    clearInterval(tickerFunction);
    ticker = 0
    tickerFunction = setInterval(function(){ticker +=1}, 1000)
    messageContent({ "animation": true })
    breakTime = true
    console.log("sent")
}
function stopAnimation() {
    messageContent({ "animation": false })
    startSnowAnimation = setTimeout(snowAnimation, timerLength * 1000 * 60)
    clearInterval(tickerFunction);
    ticker = 0
    tickerFunction = setInterval(function(){ticker +=1}, 1000)
    breakTime = false
    console.log("breaktimefalse")

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
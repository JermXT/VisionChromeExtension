
console.log('background running');


let timerLength, breakLength, startTime, timerOn = false, startSnowAnimation, timedSnowAnimation, breakTime = false, timeLeft, ticker, tickerFunction

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
         if (request.reset == true) {
                //everything is in milliseconds
                //start timer used https://www.w3schools.com/howto/howto_js_countdown.asp
                console.log("from background: received variables and now logging them");
                timerLength = request.timerLength * 60 * 1000
                breakLength = request.breakLength * 60 * 1000
                console.log("now logging timerLength");
                console.log(timerLength);
                let startTime= new Date().getTime();
                let countdown = setInterval(function(){
                    let now = new Date().getTime();
                    let distance = timerLength + ((startTime - now));
                    console.log(distance);
                    // if (distance === 0){
                    //     switchStartTime();
                    //     console.log("restarted ")
                    // }
                    let hours = Math.floor(((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    
                    //console.log(hours + "h" + minutes + 'm' + seconds + "s");
                    messagePopUp({'hours': hours, 'minutes': minutes, 'seconds': seconds, "startNow": true});
                    function messagePopUp(message){
                        console.log("from background: sent countdown to popup");
                        chrome.runtime.sendMessage(message, function(response) {
            
                              console.log(response);
                              // if(response.timerOn == false){
                              //     //makes the popup display settimer screen
                              //     settings = false;
                              // }else if(response.timerOn == true){
                              //     settings = true;
                              //     if(response.breakTime == true){
                              //         //makes the popup display time left screen, with the words time left till studying
                              //         studyTimerMode = true;
                              //         breakTimeSec = response.timeleft
                              //     }else{
                              //         //makes the popup display time left screen, with the words time left till break
                              //         studyTimerMode = false;
                              //         studyTimeSec = response.timeleft
                              //     }
                              // }
                              //console.log(response.timeLeft);
                              //response.timerLength
                              //response will be time left in seconds : {timeleft: seconds}
                      
                            });
                    //document.getElementById("timerShow").innerHTML = hours + "h" + minutes + 'm' + seconds + "s";
                        }
                    
                    
                    // if (distance < 0) {
                    //     clearInterval(x);
                    //     document.getElementById("demo").innerHTML = "EXPIRED";
                    //   }
                
                }, 1000);
                //snowAnimation();
                // while (startTime - new Date().getTime() !== timerLength){
                //     sendResponse();
                //     console.log("Sent");
                //     sendResponse({ "timeleft": timerLength - startTime - new Date().getTime(), "timerOn": true, "breaktime": false});
                // }
                
                // ticker = 0
                // tickerFunction = setInterval(function(){ticker +=1}, 1000)
                // //startTime = date.getDay() * 24 * 60 * 60 + date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()
                
                // timerOn = true
                // startSnowAnimation = setTimeout(snowAnimation, timerLength*1000*60)
                
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
function switchStartTime(){
    startTime = new Date().getTime();
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
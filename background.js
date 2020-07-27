
console.log('background running');
let date = new Date;

console.log(date.getHours());
let timerLength, breakLength, startTime, timerOn,startSnowAnimation, timedSnowAnimation

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //testing code
        if(request.testing = true){
            snowAnimation();
            sendResponse({"timeleft":"hi"})
        }
        /*
        if(request.reset == true){
            timerLength = request.timerLength
            breakLength =  request.breakLength
            startTime = date.getDay()*24*60*60+date.getHours()*60*60+date.getMinutes()*60+date.getSeconds()
            timerOn = true
            startSnowAnimation = setTimeout(snowAnimation,timerLength)
        }
        if(timerOn){
            let timeElapsed = (date.getDay()*24*60*60+date.getHours()*60*60+date.getMinutes()*60+date.getSeconds())-startTime;
            let timeLeft
            
            timeLeft = timerLength*60-timeElapsed
                
            
            sendResponse({"timeleft":timeLeft})
        }*/
    });
function snowAnimation(){
   // timedSnowAnimation = setTimeout(stopAnimation, breakLength*1000*60);//,jsonmsg3rdparam);
    messageContent({"animation":true})
    console.log("sent")
}
function stopAnimation(){
    messageContent({"animation":false})
    startSnowAnimation = setTimeout(snowAnimation,timerLength*1000*60)

}
//{animation:true/false}
//true to start it, falst to stop it
function messageContent(message){
    let params = {
        active: true
        //currentWindow: true
      }
      chrome.tabs.query(params, gotTabs);
  
      function gotTabs(tabs) {
        console.log("got tabs");
        console.log(tabs);
        // send a message to the content script
        
        
        for(let i =0;i <tabs.length;i++){
            chrome.tabs.sendMessage(tabs[i].id, message);
            
        }
    }
}
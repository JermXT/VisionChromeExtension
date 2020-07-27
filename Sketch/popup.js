function setup(){
    createCanvas(500,500);
    
    
    let userinput = select('#userinput');
    userinput.input(changeText);
    
    function changeText() {
        console.log("text changed");
        messageContent(userinput.value());
      
    }
    //messageBackground({"timerLength": 5 , "breakLength": 5, "reset":true});
    messageBackground({"testing":true})
    

}
function draw(){

}


//message should be{timerLength: x , breakLength: x, reset:true/false} 
//times should be in minutes
//all other time are in seconds
//this function should be called every time the popup is clicked(since that "refreshes" the popup)
//then while the popup is open it should decrement the timer on its own
function messageBackground(message){
    chrome.runtime.sendMessage(message, function(response) {
        console.log(response);
        //response will be time left in seconds : {timeleft: seconds}

      });
}


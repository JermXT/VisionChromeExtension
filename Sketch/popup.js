let slider1,
  slider2,
  studyTime,
  breakTime,
  button,
  settings,
  timerValue,
  timeInSeconds,
  studyTimeSec,
  breakTimeSec,
  studyTimerMode,
  hours,
  minutes,
  seconds,
  bMinutes,
  bSeconds,
  exit;
function setup(){
    createCanvas(500, 500);
    colorMode(HSB, 360, 100, 100);
    createSlider1();
    createSlider2();
    settings = false;
    studyTimerMode = false;
    setInterval(timeIt, 1000);
    messageBackground({"getData":true})
    //message to background
    //Testing code
    //messageBackground({"timerLength": 5 , "breakLength": 5, "reset":true});
    //messageBackground({"testing":true})
}
function draw() {
    background(210, 20, 95);
  
    if (settings == false) {
      textAlign(LEFT);
      text(
        "Set your desired screen time and how long you want a break!",
        20,
        80
      );
      studyTime = slider1.value();
      textSize(14);
      text(`Screen time for ${studyTime} minutes`, 20, 150);
  
      breakTime = slider2.value();
      textSize(14);
      text(`Take a break for ${breakTime} minutes`, 20, 250);
  
      studyTimeSec = studyTime * 60;
      breakTimeSec = breakTime * 60;
      makeButton();
    }
    
    if (settings == false) {
      slider1.show();
      slider2.show();
    }
    if (settings == true) {
      slider1.hide();
      slider2.hide();
    }
  
    if (settings == true) {
      exitButton();
    }
  
    if (settings == true && studyTimerMode == true) {
      if (hours >= 1) {
        textAlign(CENTER);
        if (minutes == 1) {
          text(
            `You have ${hours} HOUR, ${minutes} MINUTE, and ${seconds} SECONDS until your break!`,
            width / 2,
            height / 2
          );
        } else {
          text(
            `You have ${hours} HOUR, ${minutes} MINUTES, and ${seconds} SECONDS until your break!`,
            width / 2,
            height / 2
          );
        }
      } else if (hours == 0 && minutes > 1) {
        textAlign(CENTER);
        text(
          `You have ${minutes} MINUTES and ${seconds} SECONDS until your break!`,
          width / 2,
          height / 2
        );
      } else if (hours == 0 && minutes == 1) {
        textAlign(CENTER);
        text(
          `You have ${minutes} MINUTE and ${seconds} SECONDS until your break!`,
          width / 2,
          height / 2
        );
      } else if (minutes == 0) {
        textAlign(CENTER);
        text(
          `You have ${seconds} SECONDS until your break!`,
          width / 2,
          height / 2
        );
      }
    }
  
    if (settings == true && studyTimerMode == false) {
      if (bMinutes > 1) {
        textAlign(CENTER);
        text(
          `You have ${bMinutes} MINUTES and ${bSeconds} SECONDS until going back to the screen!`,
          width / 2,
          height / 2
        );
        text("Rest your eyes, stand up, and move around until the snow fills the screen.",0, height/2 + 30, width );
      } else if (bMinutes == 1) {
        textAlign(CENTER);
        text(
          `You have ${bMinutes} MINUTE and ${bSeconds} SECONDS until going back to the screen!`,
          width / 2,
          height / 2
        );
        text("Rest your eyes, stand up, and move around until the snow fills the screen.",0, height/2 + 30, width );
      } else if (bMinutes == 0) {
        textAlign(CENTER);
        text(
          `You have ${bSeconds} SECONDS until going back to the screen!`,
          width / 2,
          height / 2
        );
        text("Rest your eyes, stand up, and move around until the snow fills the screen.",0, height/2 + 30, width );
      }
    }
  }
  
  function makeButton() {
    button = rect(200, 350, 100, 40);
    text("START!", 225, 374);
  }
  
  function exitButton() {
    exit = rect(200, 350, 100, 40);
    text("EXIT", 250, 374);
  }
  
  function createSlider1() {
    slider1 = createSlider(0, 90, 100);
    slider1.position(width * 0.45, 150);
    slider1.style("width", "80px");
    slider1.size(width / 2);
  }
  
  function createSlider2() {
    slider2 = createSlider(0, 10, 100);
    slider2.position(width * 0.45, 250);
    slider2.style("width", "80px");
    slider2.size(width / 2);
  }
  
  function mouseClicked() {
    //start studying button
    if (
      mouseX > 200 &&
      mouseX < 300 &&
      mouseY > 350 &&
      mouseY < 390 &&
      settings == false
    ) {
      settings = true;
      studyTimerMode = true;
      messageBackground({"getData":false,"timerLength": studyTime, "breakLength": breakTime, "reset":true,"timerOn": true })
    }
    //Exit button
    else if (
      mouseX > 200 &&
      mouseX < 300 &&
      mouseY > 350 &&
      mouseY < 390 &&
      settings == true
    ) {
      settings = false;
      studyTimerMode = false;
      messageBackground({"getData":false,"timerLength": studyTime, "breakLength": breakTime, "reset":false,"timerOn":false})
    }
  }
  
  function timeIt() {
    if (studyTimeSec > 0) {
      studyTimeSec--;
    }
    if (studyTimeSec == 0) {
      studyTimeSec = studyTime * 60;
      studyTimerMode = true;
    }
  
    if (studyTimerMode == false) {
      if (breakTimeSec > 0) {
        breakTimeSec--;
      }
      if (breakTimeSec == 0) {
        studyTimerMode = false;
        breakTimeSec = breakTime * 60;
      }
    }
    hours = floor(studyTimeSec / 3600);
    minutes = floor(studyTimeSec / 60) - hours * 60;
    seconds = studyTimeSec % 60;
  
    bMinutes = floor(breakTimeSec / 60);
    bSeconds = breakTimeSec % 60;
  }
  


//message should be{"timeleft":timeLeft,"timerOn":true/false, "breaktime":true/false}
//times should be in minutes
//all other time are in seconds
//this function should be called every time the popup is clicked(since that "refreshes" the popup)
//then while the popup is open it should decrement the timer on its own
function messageBackground(message){
    chrome.runtime.sendMessage(message, function(response) {
        console.log(response);
        if(response.timerOn == false){
            //makes the popup display settimer screen
            settings = false;
        }else if(response.timerOn == true){
            settings = true;
            if(response.breakTime == true){
                //makes the popup display time left screen, with the words time left till studying
                studyTimerMode = true;
                breakTimeSec = response.timeleft
            }else{
                //makes the popup display time left screen, with the words time left till break
                studyTimerMode = false;
                studyTimeSec = response.timeleft
            }
        }
        response.timerLength
        //response will be time left in seconds : {timeleft: seconds}

      });
}


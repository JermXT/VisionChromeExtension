// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log('sketch blah');

console.log("Chrome extension go?");


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  if(message.animation==true){
    console.log("start animation")
    var myp5 = new p5(s);
    
  }else if(message.animation == false){
    myp5 = null;
  }
  
}

// sample P5 for implementing snowfalling
let snow, img, move, ground, groundY;
var s = function(sketch) {
  sketch.setup = function() {
    document.body.style['userSelect'] = 'none';
    let h = document.body.clientHeight;
    let c = sketch.createCanvas(sketch.windowWidth, h);
    c.position(0, 0);
    c.style('pointer-events', 'none');
    //sketch.clear();
    //createCanvas(windowWidth - 20, windowHeight - 20);
    move = 0.1; //about 5 min and 40 seconds
    groundY = sketch.windowHeight;
    
    //TODO: make it so that images can be accessed locally
    img = sketch.loadImage(
      
      chrome.runtime.getURL('Sketch/snowflake.png')
    );
    ground = sketch.loadImage(
      
      chrome.runtime.getURL('Sketch/ground.png')
    );
    snow = [];
    for (let j = 0; j < Math.floor(sketch.windowWidth / 10); j++) {
      if (j % 5 == 0) {
        snow.push(new Snowflake(-1));
      } else {
        snow.push(new Snowflake(1));
      }
    }
  };

  sketch.draw = function() {
    sketch.background(255);
    sketch.fill(0);
    sketch.textSize(30);
    sketch.textAlign(sketch.CENTER, sketch.TOP);
    sketch.fill(51, 185, 229);
    sketch.text(
      "Break time! Rest your eyes, stand up, and move around until the snow fills the screen.",
      0,
      12,
      sketch.windowWidth
    );

    for (let i = 0; i < snow.length; i++) {
      snow[i].fall();
      snow[i].display();
    }
    groundY = groundY - move;
    sketch.image(ground, 0, groundY, sketch.windowWidth, sketch.windowHeight);
    sketch.fill(255);
    sketch.noStroke();
    sketch.rect(0, groundY + 800, sketch.windowWidth, sketch.windowHeight);
    if (groundY <= -sketch.windowHeight / 1.3) {
      sketch.noLoop();
    }
  };

  class Snowflake {
    //snowflake class that animates and displays snowflakes
    constructor(one) {
      this.x = Math.random(sketch.windowWidth);
      this.y = -10;
      this.width = 100;
      this.height = 50;
      this.fallSpeed = Math.random(3, 8);
      this.one = one;
    }
  
    fall() {
      this.x += (this.fallSpeed / 2) * this.one;
      this.y += this.fallSpeed;
      if (this.y > sketch.windowHeight) {
        this.y = 0;
        this.x = Math.random(sketch.windowWidth);
      }
    }
  
    display() {
      //fill(this.color);
      //noStroke();
      sketch.image(img, this.x, this.y, this.width, this.height);
      //ellipse(this.x, this.y, this.r * 2);
    }
  };
  
};





/*
function click(e) {
  chrome.tabs.executeScript(null,
      {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
*/




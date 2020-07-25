// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log('sketch blah');

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


var s = function(sketch) {
  sketch.setup = function() {
    document.body.style['userSelect'] = 'none';
    let h = document.body.clientHeight;
    let c = sketch.createCanvas(sketch.windowWidth, h);
    c.position(0, 0);
    c.style('pointer-events', 'none');
    sketch.clear();
  };

  sketch.draw = function() {
    sketch.stroke(0);
    sketch.strokeWeight(4);
    if (sketch.mouseIsPressed) {
      sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
    }
  };
};

var myp5 = new p5(s);

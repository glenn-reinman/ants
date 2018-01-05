//This file contains initial scripts to setup the ants environment

//IDE Setup
// if(document.cookie)
//     document.getElementById("ide").innerHTML = document.cookie.substring(5);
// else
document.getElementById("ide").innerHTML = dumbAntProg;

var editor = ace.edit("ide");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/bug");
var compiledProgram = compile(editor.getValue());
var cpuProgram = compile(dumbAntProg);

//Terminal Setup
document.getElementById("terminal").innerHTML = terminalInstructions;
var terminal = ace.edit("terminal");
terminal.setTheme("ace/theme/vibrant_ink");
terminal.setReadOnly(true);
terminal.setHighlightActiveLine(false);
document.getElementById("terminal").removeAttribute("tabIndex");

//Simulation Setup
// graphics.js
var canvas = document.getElementById('graphics');
var sim = document.getElementById("sim");
var ctx = canvas.getContext("2d");

var w = window.getComputedStyle(sim).width;
canvas.width = parseInt(w.substring(0, w.length - 2));
canvas.height = canvas.width;

var offset = canvas.width/64;

var sw = new StudentWorld();
//Why does this only work if it's in a function?
start();
function start(){
	sw.init(compiledProgram,cpuProgram,cpuProgram,cpuProgram);
	sw.draw();
}
var tickInterval;


//resize handler for canvas
function onResize( element, callback ){
  var elementHeight = element.clientHeight,
      elementWidth = element.clientWidth;
  setInterval(function(){
      if( element.clientHeight !== elementHeight || element.clientWidth !== elementWidth ){
        elementHeight = element.clientHeight;
        elementWidth = element.clientWidth;
        callback(elementHeight, elementWidth);
      }
  }, 50);
}

onResize( document.getElementById("sim"), function(h, w){ canvas.width = w; canvas.height = h; offset = canvas.width/64; sw.draw(); } );


//cookies for refresh

setInterval(function(){
    document.cookie = "code=" + editor.getValue();
}, 300);

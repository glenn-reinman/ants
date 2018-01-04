//This file contains initial scripts to setup the ants environment

//IDE Setup
document.getElementById("ide").innerHTML = dumbAntProg;
var editor = ace.edit("ide");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/bug");

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
start();

function start(){
	sw.init();
	sw.draw();
}

function run(){
	var tickInterval = setInterval(function(){
		if(sw.ticks === 2000) {
            clearInterval(tickInterval)
        }
        sw.move();
		sw.draw();
	}, 50);
}

function compileCode(){
    terminal.setValue("Compiling...\n");
    terminal.gotoLine(2);
    var result = compile(editor.getValue());
    if(result[0]){
        terminal.insert("Colony '" + result[2] + "' successfully compiled (" + result[1]+")");
        console.log(result);
    }else{
        terminal.insert("ERROR (Line "+result[1]+"): "+result[2]);
    }
    terminal.clearSelection();

}

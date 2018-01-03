// graphics.js
var canvas = document.getElementById('graphics');
var sim = document.getElementById("sim");
var ctx = canvas.getContext("2d");

var w = window.getComputedStyle(sim).width;
canvas.width = parseInt(w.substring(0, w.length - 2));
canvas.height = canvas.width;

var offset = canvas.width/64;

var sw = new StudentWorld();
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
	}, 300);
}

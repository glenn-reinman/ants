// graphics.js

var canvas = document.getElementById('graphics');
var sim = document.getElementById("sim");
var ctx = canvas.getContext("2d");

var w = window.getComputedStyle(sim).width
canvas.width = parseInt(w.substring(0, w.length - 2));
canvas.height = canvas.width;


var offset = canvas.width/64;


function populateArray(){

	var actors = [];
	for(var i = 0; i < 64; i++){
		for(var j = 0; j < 64; j++){
			if(i == 0 || j == 0 || i == 63 || j == 63){
				let tmp = new Pebble(actors, i, j);
				actors.push(tmp);
			}
		}
	}

	let f = new Food(actors, 1, 1, 100);
	actors.push(f);
	let ah = new AntHill(actors, 1, 2, Colony.green, 'p1');
	actors.push(ah);

	let pb = new Pheromone(actors, 1, 3, Colony.blue, Pheromone.pnone);
	actors.push(pb);
	let pg = new Pheromone(actors, 2, 3, Colony.green, Pheromone.pnone);
	actors.push(pg);
	let pr = new Pheromone(actors, 3, 3, Colony.red, Pheromone.pnone);
	actors.push(pr);
	let py = new Pheromone(actors, 4, 3, Colony.yellow, Pheromone.pnone);
	actors.push(py);

	let wp = new WaterPool(actors, 1, 4);
	actors.push(wp);
	let po = new Poison(actors, 1, 5);
	actors.push(po);

	let anb = new Ant(actors, 1, 6, Colony.blue, 'p2', 'ant');
	actors.push(anb);
	let ang = new Ant(actors, 2, 6, Colony.green, 'p2', 'ant');
	actors.push(ang);
	let anr = new Ant(actors, 3, 6, Colony.red, 'p2', 'ant');
	actors.push(anr);
	let any = new Ant(actors, 4, 6, Colony.yellow, 'p2', 'ant');
	actors.push(any);

	let bg = new BabyGrasshopper(actors, 1, 7);
	actors.push(bg);
	let ag = new AdultGrasshopper(actors, 1, 8);
	actors.push(ag);

	return actors;
}

function start(){
	draw(populateArray());
}

function draw(arr) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < 64; i++){
		for(var j = 0; j < 64; j++){
			ctx.fillStyle = ((i+j)%2 == 0)? "#ffffff": "#dddddd";
			ctx.fillRect(i*offset, j*offset, offset, offset);
		}
	}
	for(var i = 0; i < arr.length; i++){
		ctx.drawImage(arr[i].img, arr[i].x*offset, arr[i].y*offset, offset, offset);
	}
}

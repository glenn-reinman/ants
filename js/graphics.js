// graphics.js

var canvas = document.getElementById('graphics');
var sim = document.getElementById("sim");
var ctx = canvas.getContext("2d");

var w = window.getComputedStyle(sim).width
canvas.width = parseInt(w.substring(0, w.length - 2));
canvas.height = canvas.width;


var offset = canvas.width/32;


function populateArray(){

	var allActors = [];
	for(var i = 0; i < 64; i++){
		for(var j = 0; j < 64; j++){
			if(i == 0 || j == 0 || i == 63 || j == 63){
				let tmp = new Pebble(allActors, i, j);
				allActors.push(tmp);
			}
		}
	}

	let f = new Food(allActors, 1, 1, 100);
	allActors.push(f);
	let ah = new AntHill(allActors, 1, 2, Colony.green, 'p1');
	allActors.push(ah);

	let pb = new Pheromone(allActors, 1, 3, Colony.blue, Pheromone.pnone);
	allActors.push(pb);
	let pg = new Pheromone(allActors, 2, 3, Colony.green, Pheromone.pnone);
	allActors.push(pg);
	let pr = new Pheromone(allActors, 3, 3, Colony.red, Pheromone.pnone);
	allActors.push(pr);
	let py = new Pheromone(allActors, 4, 3, Colony.yellow, Pheromone.pnone);
	allActors.push(py);

	let wp = new WaterPool(allActors, 1, 4);
	allActors.push(wp);
	let po = new Poison(allActors, 1, 5);
	allActors.push(po);

	let anb = new Ant(allActors, 1, 6, Colony.blue, 'p2', 'ant');
	allActors.push(anb);
	let ang = new Ant(allActors, 2, 6, Colony.green, 'p2', 'ant');
	allActors.push(ang);
	let anr = new Ant(allActors, 3, 6, Colony.red, 'p2', 'ant');
	allActors.push(anr);
	let any = new Ant(allActors, 4, 6, Colony.yellow, 'p2', 'ant');
	allActors.push(any);

	let bg = new BabyGrasshopper(allActors, 1, 7);
	allActors.push(bg);
	let ag = new AdultGrasshopper(allActors, 1, 8);
	allActors.push(ag);

	


	return allActors;
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
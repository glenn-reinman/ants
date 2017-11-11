var canvas = document.getElementById('graphics');
var sim = document.getElementById("sim");
var ctx = canvas.getContext("2d");

var w = window.getComputedStyle(sim).width
canvas.width = parseInt(w.substring(0, w.length - 2));
canvas.height = canvas.width;

var grid = [];
for(var i = 0; i < 64; i++){
	grid.push([]);
	for(var j = 0; j < 64; j++){
		grid[i].push([]);
	}
}

var offset = canvas.width/64;
for(var i = 0; i < 64; i++){
	for(var j = 0; j < 64; j++){
		ctx.fillStyle = ((i+j)%2 == 0)? "#ffffff": "#dddddd";
		ctx.fillRect(i*offset, j*offset, offset, offset);
	}
}

function populateGrid(){
	for(var i = 0; i < 64; i++){
		for(var j = 0; j < 64; j++){
			if(i == 0 || j == 0 || i == 63 || j == 63)
				grid[i][j].push(rest.rock1);
		}
	}
	grid[3][2].push(rest.rock1);
}

function start(){
	populateGrid();
	drawGrid();
}

function drawGrid() {
	for(var i = 0; i < 64; i++){
		for(var j = 0; j < 64; j++){
			if(grid[i][j] != null){
				for(var k = 0; k < grid[i][j].length; k++){
					ctx.drawImage(grid[i][j][k], j*offset, i*offset, offset, offset);
				}
			}
		}
	}
}


// red.style.width = ''+offset + 'px';
// red.style.height = "auto";
// document.body.append(red);


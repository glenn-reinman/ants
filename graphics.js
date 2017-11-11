var canvas = document.getElementById('graphics');
var sim = document.getElementById("sim");
var ctx = canvas.getContext("2d");

var w = window.getComputedStyle(sim).width
canvas.width = parseInt(w.substring(0, w.length - 2));
canvas.height = canvas.width;


var offset = canvas.width/64;

function populateArray(){
	var ans = [];
	for(var i = 0; i < 64; i++){
		for(var j = 0; j < 64; j++){
			if(i == 0 || j == 0 || i == 63 || j == 63){
				ans.push({});
				ans[ans.length-1].x = i;
				ans[ans.length-1].y = j;
				ans[ans.length-1].img = rest.rock1;
			}
		}
	}
	ans.push({x: 2, y: 3, img: rest.rock1});
	return ans;
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
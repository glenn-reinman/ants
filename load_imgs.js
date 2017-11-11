var ants = {"red": {}, "white": {}, "yellow": {}, "green": {}};
var grass = {"adult": {}, "baby": {}};
var rest = {"anthill": null, "food": null, "poison": null, "rock1": null, "waterpool": null};

var loaded_imgs = 0;

var temp = Object.keys(ants);
for (var i = 0; i < temp.length; i++){
	for(var j = 0; j < 4; j++){
		ants[temp[i]][j] = new Image();
		ants[temp[i]][j].src = "assets/" + temp[i] + "ant" + j + ".png";
		ants[temp[i]][j].onload = function(){loaded_imgs++; if(loaded_imgs == 33) {start();}};
	}
	ants[temp[i]].pher = new Image();
	ants[temp[i]].pher.src = "assets/" + temp[i] + "pher" + ".png";
	ants[temp[i]].pher.onload = function(){loaded_imgs++; if(loaded_imgs == 33) {start();}};
}

temp = Object.keys(grass);
for (var i = 0; i < temp.length; i++){
	for(var j = 0; j < 4; j++){
		grass[temp[i]][j] = new Image();
		grass[temp[i]][j].src = "assets/" + temp[i] + "grass" + j + ".png";
		grass[temp[i]][j].onload = function(){loaded_imgs++; if(loaded_imgs == 33) {start();}};
	}
}

temp = Object.keys(rest);
for (var i = 0; i < temp.length; i++){
	rest[temp[i]] = new Image();
	rest[temp[i]].src = "assets/" + temp[i] + ".png";
	rest[temp[i]].onload = function(){loaded_imgs++; if(loaded_imgs == 33) {start();}};
}

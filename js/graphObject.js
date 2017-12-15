// graphObject.js

class GraphObject {
	constructor(img, startX, startY, startDir, depth) {
		this.img = imgs[img];
		this.x = startX;
		this.y = startY;
		this.destX = startX;
		this.destY = startY;
		this.dir = startDir;
		this.depth = depth;
	}

	getX(){//likely to be unnecessary
		return this.x;
	}

	getY(){//likely to be unnecessary
		return this.y;
	}

	moveTo(x, y){
		this.x = x;
		this.y = y;
	}

	getDirection(){//likely to be unnecessary
		return this.dir;
	}

	setDirection(dir){
		this.dir = dir;
	}

	//updateImg(){ // update img according to current direction
	//}
}

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

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    moveTo(x, y){
        this.destX = x;
        this.destY = y;
    }

    getDirection(){
        return this.dir;
    }

    setDirection(dir){
        this.dir = dir;
    }

    //updateImg(){ // update img according to current direction
    //}
}

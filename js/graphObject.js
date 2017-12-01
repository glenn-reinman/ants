// graphObject.js

// Direction enum
Direction = {
    none: -1,
    up: 0,
    right: 1,
    down: 2,
    left: 3
}

class GraphObject {
    constructor(startX, startY, startDir, img, depth) {
        this.x = startX;
        this.y = startY;
        this.dir = startDir;
        this.img = img;
        this.depth = depth;
    }
}
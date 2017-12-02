// graphObject.js

// Direction enum
Direction = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
}

class GraphObject {
    constructor(img, startX, startY, startDir, depth) {
        this.img = img;
        this.x = startX;
        this.y = startY;
        this.dir = startDir;
        this.depth = depth;
    }
}
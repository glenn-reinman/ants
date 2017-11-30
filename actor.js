// actor.js

class Actor extends GraphObject{
	constructor(startX, startY, startDir, img, depth) {
		super(startX, startY, startDir, img, depth);
	}
}

class Pebble extends Actor {
	constructor(startX, startY) {
		super(startX, startY, 1, rest.rock1, 2);
	}
}

class EnergyHolder extends Actor {
	constructor() {

	}
}

class Food extends EnergyHolder {
	constructor() {

	}
}

class AntHill extends EnergyHolder {
	constructor() {

	}
}

class Pheromone extends EnergyHolder {
	constructor() {

	}
}

class TriggerableActor extends Actor {
	constructor() {

	}
}

class WaterPool extends TriggerableActor {
	constructor() {

	}
}

class Poison extends TriggerableActor {
	constructor() {

	}
}

class Insect extends EnergyHolder {
	constructor() {

	}
}

class Ant extends Insect {
	constructor() {

	}
}

class Grasshopper extends Insect {
	constructor() {

	}
}

class BabyGrasshopper extends Grasshopper {
	constructor() {

	}
}

class AdultGrasshopper extends Grasshopper {
	constructor() {

	}
}

















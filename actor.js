// actor.js

class Actor extends GraphObject{
	constructor(world, startX, startY, startDir, img, depth) {
		super(startX, startY, startDir, img, depth);
		this.world = world;
	}

	doSomething() {
	}

	isDead() {
	}

	blocksMovement() {
	}

	getBitten() {
	}

	getPoisoned() {
	}

	getStunned() {
	}

	isEdible() {
	}

	isPheromone() {
	}

	isPheromoneType() {
	}

	isEnemy() {
	}

	isDangerous() {
	}

	isAntHill() {
	}

}

class Pebble extends Actor {
	constructor(world, startX, startY) {
		super(world, startX, startY, Direction.none, rest.rock1, 2);
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

















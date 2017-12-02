// actor.js

class Actor extends GraphObject{
	constructor(studentWorld, startX, startY, startDir, img, depth){
		super(img, startX, startY, startDir, depth);
		this.studentWorld = studentWorld;
	}

	doSomething(){
	}

	isDead(){
		return false;
	}

	blocksMovement(){
		return false;
	}

	getBitten(amt){
	}

	getPoisoned(){
	}

	getStunned(){
	}

	isEdible(){
		return false;
	}

	isPheromone(colony){
		return false;
	}

	isPheromoneType(pheromoneType){
		return false;
	}

	isEnemy(colony){
		return false;
	}

	isDangerous(colony){
		return isEnemy(colony);
	}

	isAntHill(colony){
		return false;
	}

	getstudentWorld(){
		return this.studentWorld;
	}
}

class Pebble extends Actor {
	constructor(studentWorld, startX, startY){
		super(studentWorld, startX, startY, Direction.right, 'rock1', PEBBLE_DEPTH);
	}

	doSomething(){
	}

	blocksMovement(){
		return true;
	}
}

class EnergyHolder extends Actor {
	constructor(studentWorld, startX, startY, startDir, energy, img, depth){
		super(studentWorld, startX, startY, startDir, img, depth);
		this.energy = energy;

		this.death_food = DEATH_FOOD_AMOUNT;
	}

	isDead(){
		return this.energy <= 0;
	}

	getEnergy(){
		return this.energy;
	}

	updateEnergy(amt){
		this.energy += amt;
		if (this.energy <= 0)
	    {
	        this.energy = 0;
	        if (this.becomesFoodUponDeath())
	            this.addFood(DEATH_FOOD_AMOUNT);
	    }
	}

	addFood(amt){
		/*var w = getstudentWorld();

	    EnergyHolder* f = static_cast<EnergyHolder*>(sw->getEdibleAt(getX(), getY()));
	    if (f != nullptr)
	        f->updateEnergy(amt);
	    else
	        sw->addActor(new Food(sw, getX(), getY(), amt));*/
	}

	pickupFood(amt){
	}

	pickupAndEatFood(amt){
	}

	becomesFoodUponDeath(){
		return false;
	}
}

class Food extends EnergyHolder {
	constructor(studentWorld, startX, startY, energy){
		super(studentWorld, startX, startY, Direction.none, energy, 'food', FOOD_DEPTH)
	}

	doSomething(){
	}

	isEdible(){
	}
}

class AntHill extends EnergyHolder {
	constructor(studentWorld, startX, startY, colony, program){
		super(studentWorld, startX, startY, Direction.none, ANTHILL_START_FOOD, 'anthill', ANTHILL_DEPTH)
		this.colony = colony;
		this.program = program;
	}

	doSomething(){
	}

	isAntHill(colony){
	}
}

class Pheromone extends EnergyHolder {
	constructor(studentWorld, startX, startY, colony, pheromoneType){
		super(studentWorld, startX, startY, Direction.none, PHEROMONE_START_STRENGTH, colony + 'pher', PHEROMONE_DEPTH)
		this.colony = colony;
		this.pheromoneType = pheromoneType;
	}

	doSomething(){
	}

	isPheromone(colony){
	}

	setPheromoneType(pheromoneType){
	}

	getPheromoneType(){
	}

	isPheromoneType(pheromoneType){
	}

	increaseStrength(){
	}

	
}

class TriggerableActor extends Actor {
	constructor(studentWorld, startX, startY, img){
		super(studentWorld, startX, startY, Direction.none, img, ACTIVATING_OBJECT_DEPTH);
	}

	isDangerous(colony){
	}
}

class WaterPool extends TriggerableActor {
	constructor(studentWorld, startX, startY){
		super(studentWorld, startX, startY, 'waterpool')
	}

	doSomething(){
	}
}

class Poison extends TriggerableActor {
	constructor(studentWorld, startX, startY){
		super(studentWorld, startX, startY, 'poison')
	}

	doSomething(){
	}
}

class Insect extends EnergyHolder {
	constructor(studentWorld, startX, startY, energy, img){
		super(studentWorld, startX, startY, Direction.right, energy, img + Direction.right, INSECT_DEPTH); //change Direction.right to some getRandomDirection() later
		this.sleepTicks = 0;
		this.stunned = false;
	}

	doSomething(){
	}

	getBitten(amt){
	}

	getPoisoned(){
	}

	getStunned(){
	}

	isEnemy(colony){
	}

	becomesFoodUponDeath(){
	}

	getXYInFrontOfMe(x, y){
	}

	moveForwardIfPossible(){
	}

	increaseSleepTicks(amt){
	}

	getRandomDirection(){
	}

	doSomethingAux(){
	}
}

class Ant extends Insect {
	constructor(studentWorld, startX, startY, colony, program){// remove 'img' from header, this is diff from sol
		super(studentWorld, startX, startY, ANT_START_ENERGY, colony + 'ant')
		this.colony = colony;
		this.program = program;

		this.ip = 0;
		this.lastRandomNumber = 0;
		this.lastPheromoneType = Pheromone.pnone;
		this.lastPheromoneStrength = 0;
		this.foodHeld = 0;
		this.iWasBit = false;
		this.blockedFromMoving = false;
	}

	getBitten(amt){
	}

	isEnemy(colony){
	}

	moveForwardIfPossible(){
	}

	doSomethingAux(){
	}

	conditionTrue(){
	}

	emitPheromone(pheromoneType){
	}
}

class Grasshopper extends Insect {
	constructor(studentWorld, startX, startY, energy, img){
		super(studentWorld, startX, startY, energy, img)
	}

	doSomethingAux(){
	}

	doPreActionThenProceed(){
	}

	chooseDirectionAndDistance(){
	}
}

class BabyGrasshopper extends Grasshopper {
	constructor(studentWorld, startX, startY){
		super(studentWorld, startX, startY, BABY_GRASSHOPPER_START_ENERGY, 'babygrass')
	}

	isEnemy(colony){
	}

	doPreActionThenProceed(){
	}
}

class AdultGrasshopper extends Grasshopper {
	constructor(studentWorld, startX, startY){
		super(studentWorld, startX, startY, ADULT_GRASSHOPPER_START_ENERGY, 'adultgrass')

	}

	getBitten(amt){
	}

	doPreActionThenProceed(){
	}

	jump(){
	}
}

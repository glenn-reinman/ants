// actor.js

class Actor extends GraphObject{
	constructor(world, startX, startY, startDir, img, depth){
		super(img, startX, startY, startDir, depth);
		this.world = world;
	}

	doSomething(){
	}

	isDead(){
	}

	blocksMovement(){
	}

	getBitten(amt){
	}

	getPoisoned(){
	}

	getStunned(){
	}

	isEdible(){
	}

	isPheromone(colony){
	}

	isPheromoneType(pheromoneType){
	}

	isEnemy(colony){
	}

	isDangerous(colony){
	}

	isAntHill(colony){
	}

}

class Pebble extends Actor {
	constructor(world, startX, startY){
		super(world, startX, startY, Direction.right, 'rock1', PEBBLE_DEPTH);
	}

	doSomething(){
	}

	blocksMovement(){
	}
}

class EnergyHolder extends Actor {
	constructor(world, startX, startY, startDir, energy, img, depth){
		super(world, startX, startY, startDir, img, depth);
		this.energy = energy;

		this.death_food = DEATH_FOOD_AMOUNT;
	}

	isDead(){
	}

	getEnergy(){
	}

	updateEnergy(amt){
	}

	addFood(amt){
	}

	pickupFood(amt){
	}

	pickupAndEatFood(amt){
	}

	becomesFoodUponDeath(){
	}
}

class Food extends EnergyHolder {
	constructor(world, startX, startY, energy){
		super(world, startX, startY, Direction.none, energy, 'food', FOOD_DEPTH)
	}

	doSomething(){
	}

	isEdible(){
	}
}

class AntHill extends EnergyHolder {
	constructor(world, startX, startY, colony, program){
		super(world, startX, startY, Direction.none, ANTHILL_START_FOOD, 'anthill', ANTHILL_DEPTH)
		this.colony = colony;
		this.program = program;
	}

	doSomething(){
	}

	isAntHill(colony){
	}
}

class Pheromone extends EnergyHolder {
	constructor(world, startX, startY, colony, pheromoneType){
		super(world, startX, startY, Direction.none, PHEROMONE_START_STRENGTH, colony + 'pher', PHEROMONE_DEPTH)
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
	constructor(world, startX, startY, img){
		super(world, startX, startY, Direction.none, img, ACTIVATING_OBJECT_DEPTH);
	}

	isDangerous(colony){
	}
}

class WaterPool extends TriggerableActor {
	constructor(world, startX, startY){
		super(world, startX, startY, 'waterpool')
	}

	doSomething(){
	}
}

class Poison extends TriggerableActor {
	constructor(world, startX, startY){
		super(world, startX, startY, 'poison')
	}

	doSomething(){
	}
}

class Insect extends EnergyHolder {
	constructor(world, startX, startY, energy, img){
		super(world, startX, startY, Direction.right, energy, img + Direction.right, INSECT_DEPTH); //change Direction.right to some getRandomDirection() later
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
	constructor(world, startX, startY, colony, program){// remove 'img' from header, this is diff from sol
		super(world, startX, startY, ANT_START_ENERGY, colony + 'ant')
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
	constructor(world, startX, startY, energy, img){
		super(world, startX, startY, energy, img)
	}

	doSomethingAux(){
	}

	doPreActionThenProceed(){
	}

	chooseDirectionAndDistance(){
	}
}

class BabyGrasshopper extends Grasshopper {
	constructor(world, startX, startY){
		super(world, startX, startY, BABY_GRASSHOPPER_START_ENERGY, 'babygrass')
	}

	isEnemy(colony){
	}

	doPreActionThenProceed(){
	}
}

class AdultGrasshopper extends Grasshopper {
	constructor(world, startX, startY){
		super(world, startX, startY, ADULT_GRASSHOPPER_START_ENERGY, 'adultgrass')

	}

	getBitten(amt){
	}

	doPreActionThenProceed(){
	}

	jump(){
	}
}









































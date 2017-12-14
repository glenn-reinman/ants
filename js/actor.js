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
		return this.isEnemy(colony);
	}

	isAntHill(colony){
		return false;
	}

	getWorld(){//probably not necessary, remove later probably
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
	        if (this.becomesFoodUponDeath()){
	            this.addFood(DEATH_FOOD_AMOUNT);
	        }
	    }
	}

	addFood(amt){
		let energyHolder = this.studentWorld.getEdibleAt(this.getX(), this.getY());
		if (energyHolder != null)
			energyHolder.updateEnergy(amt);
		else{
			let f = new Food(this.studentWorld, this.getX(), this.getY(), amt);
			this.studentWorld.addActor(f);
		}

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
		return true;
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
		return this.colony == colony;
	}
}

class Pheromone extends EnergyHolder {
	constructor(studentWorld, startX, startY, colony, pheromoneType){
		super(studentWorld, startX, startY, Direction.none, PHEROMONE_START_STRENGTH, colony + 'pher', PHEROMONE_DEPTH)
		this.colony = colony;
		this.pheromoneType = pheromoneType;
	}

	doSomething(){
		super.updateEnergy(-1);
	}

	isPheromone(colony){
		return this.colony == colony;
	}

	setPheromoneType(pheromoneType){
		this.pheromoneType = pheromoneType;
	}

	getPheromoneType(){
		return this.pheromoneType;
	}

	isPheromoneType(pheromoneType){
		return this.pheromoneType == pheromoneType;
	}

	increaseStrength(){
		let amountToIncrease = Math.min(MAX_PHEROMONE_STRENGTH - super.getEnergy(), INCREMENTAL_PHEROMONE_STRENGTH);
		if (amountToIncrease > 0)
			super.updateEnergy(amountToIncrease);
	}	
}

class TriggerableActor extends Actor {
	constructor(studentWorld, startX, startY, img){
		super(studentWorld, startX, startY, Direction.none, img, ACTIVATING_OBJECT_DEPTH);
	}

	isDangerous(colony){
		return true;
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
		this.updateEnergy(-1);
		if (this.getEnergy() <= 0)
			return;
		if (this.sleepTicks > 0){
			this.sleepTicks--;
			return;
		}
		doSomethingAux();
	}

	getBitten(amt){
		super.updateEnergy(-amt);
	}

	getPoisoned(){
		super.updateEnergy(-POISON_DAMAGE);
	}

	getStunned(){
		if (!this.stunned){
			this.increaseSleepTicks(STUN_TICKS);
			this.stunned = true;
		}
	}

	isEnemy(colony){
		return true;
	}

	becomesFoodUponDeath(){
		return true;
	}

	getXYInFrontOfMe(x, y){
	}

	moveForwardIfPossible(){
	}

	increaseSleepTicks(amt){
		this.sleepTicks += amt;
	}

	getRandomDirection(){
		switch(randInt(1, 4)) {
			case 1:
				return Direction.up;
				break;
			case 2:
				return Direction.right;
				break;
			case 3:
				return Direction.down;
				break;
			case 4:
				return Direction.left;
				break;
			default:
				return Direction.none;
		}
		return Direction.none;
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
		super.getBitten(amt);
		this.iWasBit = true;
	}

	isEnemy(colony){
		return this.colony != colony;
	}

	moveForwardIfPossible(){//not tested yet b/c super.mfip not implem
		let moved = super.moveForwardIfPossible();
		if (moved)
			this.iWasBit = false;
		this.blockedFromMoving = !moved;
		return moved;
	}

	doSomethingAux(){
	}

	conditionTrue(c){
	}

	emitPheromone(pheromoneType){
	}
}

class Grasshopper extends Insect {
	constructor(studentWorld, startX, startY, energy, img){
		super(studentWorld, startX, startY, energy, img)
		this.chooseDirectionAndDistance();
		this.walkDist;
	}

	doSomethingAux(){
	}

	doPreActionThenProceed(){
	}

	chooseDirectionAndDistance(){
		this.walkDist = randInt(MIN_WALK_DIST, MAX_WALK_DIST);
		super.setDirection(super.getRandomDirection());
	}
}

class BabyGrasshopper extends Grasshopper {
	constructor(studentWorld, startX, startY){
		super(studentWorld, startX, startY, BABY_GRASSHOPPER_START_ENERGY, 'babygrass')
	}

	isEnemy(colony){
		return false;
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

// actor.js

class Actor extends GraphObject{
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), startDir = throwIfMissing(), img = throwIfMissing(), depth = throwIfMissing()){
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

	getBitten(amt = throwIfMissing()){
	}

	getPoisoned(){
	}

	getStunned(){
	}

	isEdible(){
		return false;
	}

	isPheromone(colony = throwIfMissing()){
		return false;
	}

	isPheromoneType(pheromoneType = throwIfMissing()){
		return false;
	}

	isEnemy(colony = throwIfMissing()){
		return false;
	}

	isDangerous(colony = throwIfMissing()){
		return this.isEnemy(colony);
	}

	isAntHill(colony = throwIfMissing()){
		return false;
	}

	getWorld(){//probably not necessary, remove later probably
		return this.studentWorld;
	}
}

class Pebble extends Actor {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing()){
		super(studentWorld, startX, startY, Direction.right, 'rock1', PEBBLE_DEPTH);
	}

	doSomething(){
	}

	blocksMovement(){
		return true;
	}
}

class EnergyHolder extends Actor {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), startDir = throwIfMissing(), energy = throwIfMissing(), img = throwIfMissing(), depth = throwIfMissing()){
		super(studentWorld, startX, startY, startDir, img, depth);
		this.energy = energy;
	}

	isDead(){
		return this.energy <= 0;
	}

	getEnergy(){
		return this.energy;
	}

	updateEnergy(amt = throwIfMissing()){
		this.energy += amt;
		if (this.energy <= 0)
	    {
	        this.energy = 0;
	        if (this.becomesFoodUponDeath()){
	            this.addFood(DEATH_FOOD_AMOUNT);
	        }
	    }
	}

	addFood(amt = throwIfMissing()){
		let energyHolder = this.studentWorld.getEdibleAt(this.getX(), this.getY());
		if (energyHolder != null)
			energyHolder.updateEnergy(amt);
		else{
			let f = new Food(this.studentWorld, this.getX(), this.getY(), amt);
			this.studentWorld.addActor(f);
		}
	}

	pickupFood(amt = throwIfMissing()){
		let energyHolder = this.studentWorld.getEdibleAt(this.getX(), this.getY());
		if (energyHolder == null)
			return 0;
		if (amt > energyHolder.getEnergy())
			amt = energyHolder.getEnergy();
		energyHolder.updateEnergy(-amt);
		return amt;
	}

	pickupAndEatFood(amt = throwIfMissing()){
		amt = this.pickupFood(amt);
		this.updateEnergy(amt);
		return amt;
	}

	becomesFoodUponDeath(){
		return false;
	}
}

class Food extends EnergyHolder {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), energy = throwIfMissing()){
		super(studentWorld, startX, startY, Direction.none, energy, 'food', FOOD_DEPTH)
	}

	doSomething(){
	}

	isEdible(){
		return true;
	}
}

class AntHill extends EnergyHolder {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), colony = throwIfMissing(), program = throwIfMissing()){
		super(studentWorld, startX, startY, Direction.none, ANTHILL_START_FOOD, 'anthill', ANTHILL_DEPTH)
		this.colony = colony;
		this.program = program;
	}

	doSomething(){
	}

	isAntHill(colony = throwIfMissing()){
		return this.colony == colony;
	}
}

class Pheromone extends EnergyHolder {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), colony = throwIfMissing(), pheromoneType = throwIfMissing()){
		super(studentWorld, startX, startY, Direction.none, PHEROMONE_START_STRENGTH, colony + 'pher', PHEROMONE_DEPTH)
		this.colony = colony;
		this.pheromoneType = pheromoneType;
	}

	doSomething(){
		super.updateEnergy(-1);
	}

	isPheromone(colony = throwIfMissing()){
		return this.colony == colony;
	}

	setPheromoneType(pheromoneType = throwIfMissing()){
		this.pheromoneType = pheromoneType;
	}

	getPheromoneType(){
		return this.pheromoneType;
	}

	isPheromoneType(pheromoneType = throwIfMissing()){
		return this.pheromoneType == pheromoneType;
	}

	increaseStrength(){
		let amountToIncrease = Math.min(MAX_PHEROMONE_STRENGTH - super.getEnergy(), INCREMENTAL_PHEROMONE_STRENGTH);
		if (amountToIncrease > 0)
			super.updateEnergy(amountToIncrease);
	}	
}

class TriggerableActor extends Actor {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), img = throwIfMissing()){
		super(studentWorld, startX, startY, Direction.none, img, ACTIVATING_OBJECT_DEPTH);
	}

	isDangerous(colony = throwIfMissing()){
		return true;
	}
}

class WaterPool extends TriggerableActor {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing()){
		super(studentWorld, startX, startY, 'waterpool')
	}

	doSomething(){
	}
}

class Poison extends TriggerableActor {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing()){
		super(studentWorld, startX, startY, 'poison')
	}

	doSomething(){
	}
}

class Insect extends EnergyHolder {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), energy = throwIfMissing(), img = throwIfMissing()){
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

	getBitten(amt = throwIfMissing()){
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

	isEnemy(colony = throwIfMissing()){
		return true;
	}

	becomesFoodUponDeath(){
		return true;
	}

	getXYInFrontOfMe(x = throwIfMissing(), y = throwIfMissing()){
	}

	moveForwardIfPossible(){
	}

	increaseSleepTicks(amt = throwIfMissing()){
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
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), colony = throwIfMissing(), program = throwIfMissing()){// remove 'img' from header, this is diff from sol
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

	getBitten(amt = throwIfMissing()){
		super.getBitten(amt);
		this.iWasBit = true;
	}

	isEnemy(colony = throwIfMissing()){
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

	conditionTrue(c = throwIfMissing()){
	}

	emitPheromone(pheromoneType = throwIfMissing()){
	}
}

class Grasshopper extends Insect {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), energy = throwIfMissing(), img = throwIfMissing()){
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
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing()){
		super(studentWorld, startX, startY, BABY_GRASSHOPPER_START_ENERGY, 'babygrass')
	}

	isEnemy(colony = throwIfMissing()){
		return false;
	}

	doPreActionThenProceed(){
	}
}

class AdultGrasshopper extends Grasshopper {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing()){
		super(studentWorld, startX, startY, ADULT_GRASSHOPPER_START_ENERGY, 'adultgrass')

	}

	getBitten(amt = throwIfMissing()){
	}

	doPreActionThenProceed(){
	}

	jump(){
	}
}

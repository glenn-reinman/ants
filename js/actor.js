// actor.js

class Actor extends GraphObject{
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), startDir = throwIfMissing(), img = throwIfMissing(), depth = throwIfMissing()){
		super(img, startX, startY, startDir, depth);
		this.studentWorld = studentWorld;
        this.moved = false;
	}

	hasMoved(){
		return this.moved;
	}

	setMoved(moved){
		this.moved = moved;
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
		super(studentWorld, startX, startY, Direction.none, 'rock1', PEBBLE_DEPTH);
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
		super(studentWorld, startX, startY, Direction.none, energy, 'food', FOOD_DEPTH);
	}

	doSomething(){
	}

	isEdible(){
		return true;
	}
}

class AntHill extends EnergyHolder {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), colony = throwIfMissing(), program = throwIfMissing()){
		super(studentWorld, startX, startY, Direction.none, ANTHILL_START_FOOD, 'anthill', ANTHILL_DEPTH);
		this.colony = colony;
		this.program = program;
	}

	doSomething(){
		this.updateEnergy(-1);
		if (this.getEnergy() == 0)
			return;

		if (this.pickupAndEatFood(QUEEN_EAT_PER_TICK) > 0)
			return;

		if (this.getEnergy() >= MIN_FOOD_TO_PRODUCE_NEW_ANT){
			let tmp = new Ant(this.studentWorld, this.getX(), this.getY(), this.colony, this.program, 'ant');
			this.studentWorld.addActor(tmp);
			this.updateEnergy(-tmp.getEnergy());
			this.studentWorld.increaseScore(this.colony);
		}
	}

	isAntHill(colony = throwIfMissing()){
		return this.colony == colony;
	}
}

class Pheromone extends EnergyHolder {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), colony = throwIfMissing(), pheromoneType = throwIfMissing()){
		super(studentWorld, startX, startY, Direction.none, PHEROMONE_START_STRENGTH, colony + 'pher', PHEROMONE_DEPTH);
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
		super(studentWorld, startX, startY, 'waterpool');
	}

	doSomething(){
		this.studentWorld.stunAllStunnableAt(this.getX(), this.getY());
	}
}

class Poison extends TriggerableActor {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing()){
		super(studentWorld, startX, startY, 'poison');
	}

	doSomething(){
		this.studentWorld.poisonAllPoisonableAt(this.getX(), this.getY());
	}
}

class Insect extends EnergyHolder {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), energy = throwIfMissing(), img = throwIfMissing()){
		super(studentWorld, startX, startY, Direction.right, energy, img, INSECT_DEPTH);
		this.sleepTicks = 0;
		this.stunned = false;
		this.setDirection(this.getRandomDirection());
	}

	doSomething(){
		this.updateImg();
		this.updateEnergy(-1);
		if (this.getEnergy() <= 0)
			return;
		if (this.sleepTicks > 0){
			this.sleepTicks--;
			return;
		}
		this.doSomethingAux();
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

	getXYInFrontOfMe(){//diff from sol; not x y in header, bc not pass by ref in js
		let x = this.getX();
		let y = this.getY();
		switch (this.getDirection())
		{
			case Direction.none:   break;
			case Direction.up:     y--; break;
			case Direction.right:  x++; break;
			case Direction.down:   y++; break;
			case Direction.left:   x--; break;
			default: break;
		}
		return [x, y];
	}

	moveForwardIfPossible(){
		let xy = this.getXYInFrontOfMe();
		let x = xy[0];
		let y = xy[1];
		if (this.studentWorld.canMoveTo(x, y)){
			this.stunned = false;
			this.moveTo(x, y);
			return true;
		}

		return false;
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
		super(studentWorld, startX, startY, ANT_START_ENERGY, colony + 'ant');
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
        this.moveForwardIfPossible();
	}

	conditionTrue(c = throwIfMissing()){
	}

	emitPheromone(pheromoneType = throwIfMissing()){
		let pheromone = this.studentWorld.getPheromoneAt(this.getX(), this.getY(), this.colony, pheromoneType);
		if (pheromone != null)
			pheromone.increaseStrength();
		else
			this.studentWorld.addActor(new Pheromone(this.studentWorld, this.getX(), this.getY(), this.colony, pheromoneType));
	}
}

class Grasshopper extends Insect {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing(), energy = throwIfMissing(), img = throwIfMissing()){
		super(studentWorld, startX, startY, energy, img);
		this.walkDist = 0;
		this.chooseDirectionAndDistance();
	}

	doSomethingAux(){
		if (this.doPreActionThenProceed()){
			if (this.pickupAndEatFood(GRASSHOPPER_EAT_AMOUNT) == 0 || randInt(1, 2) == 1){
				if (this.walkDist == 0)
					chooseDirectionAndDistance();
				if (this.moveForwardIfPossible())
					this.walkDist--;
				else
					this.walkDist = 0;
			}
		}
		this.increaseSleepTicks(TICKS_TO_SLEEP_BETWEEN_MOVES);
	}

	doPreActionThenProceed(){//likely to be unnecessary
	}

	chooseDirectionAndDistance(){
		this.walkDist = randInt(MIN_WALK_DIST, MAX_WALK_DIST);
		super.setDirection(super.getRandomDirection());
	}
}

class BabyGrasshopper extends Grasshopper {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing()){
		super(studentWorld, startX, startY, BABY_GRASSHOPPER_START_ENERGY, 'babygrass');
	}

	isEnemy(colony = throwIfMissing()){
		return false;
	}

	doPreActionThenProceed(){
		// see if we want to grow up
		if (this.getEnergy() >= BABY_GRASSHOPPER_GROW_UP_ENERGY){
			this.updateEnergy(-this.getEnergy());
			this.studentWorld.addActor(new AdultGrasshopper(this.studentWorld, this.getX(), this.getY()));
			return false;
		}
		return true;
	}
}

class AdultGrasshopper extends Grasshopper {
	constructor(studentWorld = throwIfMissing(), startX = throwIfMissing(), startY = throwIfMissing()){
		super(studentWorld, startX, startY, ADULT_GRASSHOPPER_START_ENERGY, 'adultgrass');

	}

	getBitten(amt = throwIfMissing()){
		super.getBitten(amt);

		// if attacked, bite something 50% of the time!
		if (!this.isDead() && randInt(1, 2) == 1)
			this.studentWorld.biteEnemyAt(this, INVALID_COLONY_NUMBER, ADULT_GRASSHOPPER_BITE_DAMAGE);
	}

	doPreActionThenProceed(){
		if (randInt(1, 3) == 1 && this.studentWorld.biteEnemyAt(this, INVALID_COLONY_NUMBER, ADULT_GRASSHOPPER_BITE_DAMAGE))
			return false;

		if (randInt(1, 10) == 1 && this.jump())
			return false;

		return true;
	}

	jump(){
		for (let i = 0; i < MAX_JUMP_TRIES; i++){
			let tx = this.getX();
			let ty = this.getY();
			let radius = randInt(MIN_JUMP_RADIUS, MAX_JUMP_RADIUS);
			let angle = 2 * Math.PI * randInt(0, 359) / 360;
			let dx = parseInt(radius * Math.cos(angle));
			let dy = parseInt(radius * Math.sin(angle));
			tx += dx;
			ty += dy;
			if (this.studentWorld.canMoveTo(tx, ty)){
				this.moveTo(tx, ty);
				return true;
			}
		}
		return false;
	}
}

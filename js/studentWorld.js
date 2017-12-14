// studentWorld.js


class StudentWorld extends GameWorld{
	constructor(){
		super()
		this.numAnts0 = 0;
		this.numAnts1 = 0;
		this.numAnts2 = 0;
		this.numAnts3 = 0;

		this.compiler0 = null;
		this.compiler1 = null;
		this.compiler2 = null;
		this.compiler3 = null;

		this.numColonies = 0;

		this.ticks = 0;

		this.map = new Array(); for (var x = 0; x < 64; x++){ this.map[x] = new Array(); for (var y = 0; y < 64; y++){this.map[x][y] = new Array();}} // Makes 3D array
	}

	init(){
		for(var x = 0; x < 64; x++){
			for(var y = 0; y < 64; y++){
				if(x == 0 || y == 0 || x == 63 || y == 63){
					let tmp = new Pebble(this, x, y);
					this.addActor(tmp);
				}
			}
		}

		//temporary display all
		let p = new Pebble(this, 1, 1);
		this.addActor(p);
		console.log("---Pebble---");
		console.log(p.blocksMovement());

		let f = new Food(this, 4, 7, START_FOOD_ENERGY);
		this.addActor(f);
		console.log("---Food---");
		console.log(f.isEdible());

		let ah = new AntHill(this, 1, 3, Colony.green, 'p1');
		this.addActor(ah);
		console.log("---Anthill---");
		console.log(ah.isAntHill(Colony.green));

		let pb = new Pheromone(this, 1, 4, Colony.blue, PheromoneType.ptype1);
		this.addActor(pb);
		let pg = new Pheromone(this, 2, 4, Colony.green, PheromoneType.ptype2);
		this.addActor(pg);
		let pr = new Pheromone(this, 3, 4, Colony.red, PheromoneType.ptype3);
		this.addActor(pr);
		let py = new Pheromone(this, 4, 4, Colony.yellow, PheromoneType.ptype3);
		this.addActor(py);
		console.log("---Pheromone---");
		console.log(py.getEnergy());
		py.doSomething();
		console.log(py.getEnergy());
		console.log(py.isPheromone(Colony.yellow));
		console.log(py.getPheromoneType());
		py.setPheromoneType(PheromoneType.ptype1);
		console.log(py.getPheromoneType());
		console.log(py.isPheromoneType(PheromoneType.ptype3));
		py.increaseStrength();
		console.log(py.getEnergy());

		let wp = new WaterPool(this, 1, 5);
		this.addActor(wp);
		console.log("---WaterPool---");

		let po = new Poison(this, 1, 6);
		this.addActor(po);
		console.log("---Poison---");

		let anb = new Ant(this, 1, 7, Colony.blue, 'p2', 'ant');
		this.addActor(anb);
		let ang = new Ant(this, 2, 7, Colony.green, 'p2', 'ant');
		this.addActor(ang);
		let anr = new Ant(this, 3, 7, Colony.red, 'p2', 'ant');
		this.addActor(anr);
		let any = new Ant(this, 4, 7, Colony.yellow, 'p2', 'ant');
		this.addActor(any);
		console.log("---Ant---");
		console.log(any.getEnergy());
		console.log(any.iWasBit);
		any.getBitten(150);
		console.log(any.getEnergy());
		console.log(any.iWasBit);
		console.log(any.isEnemy(Colony.yellow));
		console.log(f.getEnergy());
		console.log(any.getEnergy());
		any.pickupAndEatFood(50);
		console.log(f.getEnergy());
		console.log(any.getEnergy());

		let bg = new BabyGrasshopper(this, 1, 8);
		this.addActor(bg);
		console.log("---BabyGrasshopper---");
		console.log(bg.walkDist);
		console.log(bg.getDirection());
		console.log(bg.isEnemy(Colony.yellow));

		let ag = new AdultGrasshopper(this, 1, 9);
		this.addActor(ag);
		console.log("---AdultGrashopper---")
		//end temporary display all 

		console.log("---studentWorld---")

		console.log(this.getActorsAt(1, 1));
		console.log(this.getEdibleAt(4, 7));

	}

	draw(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < 64; i++){
			for(var j = 0; j < 64; j++){
				ctx.fillStyle = ((i+j)%2 == 0)? "#ffffff": "#dddddd";
				ctx.fillRect(i*offset, j*offset, offset, offset);
			}
		}

		for(var x = 0; x < 64; x++){
			for(var y = 0; y < 64; y++){
				if (this.map[x][y].length != 0){// probably will eventually have to make this display a specific image, rather than just the first
					ctx.drawImage(this.map[x][y][0].img, this.map[x][y][0].x*offset, this.map[x][y][0].y*offset, offset, offset);
				}
			}
		}

	}

	move(){
	}

	cleanUp(){
	}
	
	canMoveTo(toX, toY){
	}

	addActor(actor){
		this.map[actor.getX()][actor.getY()].push(actor);
	}

	getEdibleAt(x, y){
		let actors = this.getActorsAt(x, y);
		if (actors.length != 0){
			for (let i = 0; i < actors.length; i++){
				if (actors[i].isEdible() && !actors[i].isDead()){
					return actors[i];
				}
			}
		}

		return null;
	}

	getPheromoneAt(x, y, colony, pheromoneType){
	}

	getPheromoneAt(x, y, colony){
	}

	isEnemyAt(x, y, colony){
	}

	isDangerAt(x, y, colony){
	}

	isAntHillAt(x, y, colony){
	}

	biteEnemyAt(me, colony, biteDamage){
	}

	poisonAllPoisonableAt(x, y){
	}

	stunAllStunnableAt(x, y){
	}

	increaseScore(colonyNum){
	}

	getActorsAt(x, y){
		return this.map[x][y];
	}

	removeDeadActors(){
	}

	updateStats(){
	}

}
	
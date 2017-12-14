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

		this.world = new Array(); for (var x = 0; x < 64; x++){ this.world[x] = new Array(); for (var y = 0; y < 64; y++){this.world[x][y] = new Array();}} // Makes 3D array
	}

	init(){
		for(var x = 0; x < 64; x++){
			for(var y = 0; y < 64; y++){
				if(x == 0 || y == 0 || x == 63 || y == 63){
					let tmp = new Pebble(this.world, x, y);
					this.world[x][y].push(tmp);
				}
			}
		}

		//temporary display all
		let p = new Pebble(this.world, 1, 1);
		this.world[1][9].push(p);
		console.log("---Pebble---");
		console.log(p.blocksMovement());

		let f = new Food(this.world, 1, 2, 100);
		this.world[1][1].push(f);
		console.log("---Food---");
		console.log(f.isEdible());

		let ah = new AntHill(this.world, 1, 3, Colony.green, 'p1');
		this.world[1][2].push(ah);
		console.log("---Anthill---");
		console.log(ah.isAntHill(Colony.green));

		let pb = new Pheromone(this.world, 1, 4, Colony.blue, PheromoneType.ptype1);
		this.world[1][3].push(pb);
		let pg = new Pheromone(this.world, 2, 4, Colony.green, PheromoneType.ptype2);
		this.world[2][3].push(pg);
		let pr = new Pheromone(this.world, 3, 4, Colony.red, PheromoneType.ptype3);
		this.world[3][3].push(pr);
		let py = new Pheromone(this.world, 4, 4, Colony.yellow, PheromoneType.ptype3);
		this.world[4][3].push(py);
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

		let wp = new WaterPool(this.world, 1, 5);
		this.world[1][4].push(wp);
		console.log("---WaterPool---");

		let po = new Poison(this.world, 1, 6);
		this.world[1][5].push(po);
		console.log("---Poison---");

		let anb = new Ant(this.world, 1, 7, Colony.blue, 'p2', 'ant');
		this.world[1][6].push(anb);
		let ang = new Ant(this.world, 2, 7, Colony.green, 'p2', 'ant');
		this.world[2][6].push(ang);
		let anr = new Ant(this.world, 3, 7, Colony.red, 'p2', 'ant');
		this.world[3][6].push(anr);
		let any = new Ant(this.world, 4, 7, Colony.yellow, 'p2', 'ant');
		this.world[4][6].push(any);
		console.log("---Ant---");
		console.log(any.getEnergy());
		console.log(any.iWasBit);
		any.getBitten(1);
		console.log(any.getEnergy());
		console.log(any.iWasBit);
		console.log(any.isEnemy(Colony.yellow));

		let bg = new BabyGrasshopper(this.world, 1, 8);
		this.world[1][7].push(bg);
		console.log("---BabyGrasshopper---");
		console.log(bg.walkDist);
		console.log(bg.getDirection());
		console.log(bg.isEnemy(Colony.yellow));

		let ag = new AdultGrasshopper(this.world, 1, 9);
		this.world[1][8].push(ag);
		console.log("---AdultGrashopper---")
		//end temporary display all 

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
				if (this.world[x][y].length != 0){// probably will eventually have to make this display a specific image, rather than just the first
					ctx.drawImage(this.world[x][y][0].img, this.world[x][y][0].x*offset, this.world[x][y][0].y*offset, offset, offset);
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
	}

	getEdible(x, y){
	}

	getPheromoneAt(x, y, colony, ptype){
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
	}

	removeDeadActors(){
	}

	updateStats(){
	}

}
	
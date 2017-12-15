// studentWorld.js


class StudentWorld extends GameWorld{
	constructor(){
		super();
		this.numAnts0 = 0;
		this.numAnts1 = 0;
		this.numAnts2 = 0;
		this.numAnts3 = 0;

		this.numColonies = 0;

		this.ticks = 0;

		this.map = new Array(); for (let x = 0; x < 64; x++){ this.map[x] = new Array(); for (let y = 0; y < 64; y++){this.map[x][y] = new Array();}} // Makes 3D array

		this.scores = {'green': 0, 'red': 0, 'blue': 0, 'yellow': 0};
		this.winningScore = MIN_ANTS_TO_QUALIFY;

		this.antProgram = {'green': null, 'red': null, 'blue': null, 'yellow': null};
	}

	init(){
		for(let x = 0; x < 64; x++){
			for(let y = 0; y < 64; y++){
				if(x == 0 || y == 0 || x == 63 || y == 63){
					let tmp = new Pebble(this, x, y);
					this.addActor(tmp);
				}
			}
		}

		//temporary display all
        this.addActor(new Pebble(this, 21, 1));
        this.addActor(new Food(this, 21, 2, START_FOOD_ENERGY));
        this.addActor(new AntHill(this, 21, 3, Colony.green, 'p1'));
        this.addActor(new Pheromone(this, 21, 4, Colony.blue, PheromoneType.ptype1));
        this.addActor(new Pheromone(this, 22, 4, Colony.green, PheromoneType.ptype2));
        this.addActor(new Pheromone(this, 23, 4, Colony.red, PheromoneType.ptype3));
        this.addActor(new Pheromone(this, 24, 4, Colony.yellow, PheromoneType.ptype3));
        this.addActor(new WaterPool(this, 21, 5));
        this.addActor(new Poison(this, 21, 6));
        this.addActor(new Ant(this, 21, 7, Colony.blue, 'p2', 'ant'));
        this.addActor(new Ant(this, 22, 7, Colony.green, 'p2', 'ant'));
        this.addActor(new Ant(this, 23, 7, Colony.red, 'p2', 'ant'));
        this.addActor(new Ant(this, 24, 7, Colony.yellow, 'p2', 'ant'));
        this.addActor(new BabyGrasshopper(this, 21, 8));
        this.addActor(new AdultGrasshopper(this, 21, 9));



		//temporary test all
		let p = new Pebble(this, 1, 1);
		this.addActor(p);
		console.log("---Pebble---");
		console.log(p.blocksMovement());

		let f = new Food(this, 1, 2, START_FOOD_ENERGY);
		this.addActor(f);
		console.log("---Food---");
		console.log(f.isEdible());

		let ah = new AntHill(this, 1, 3, Colony.green, 'p1');
		this.addActor(ah);
		console.log("---Anthill---");
		console.log(ah.isAntHill(Colony.green));
		console.log(ah.getEnergy());
		console.log(ah.studentWorld.getActorsAt(1,3));
		console.log(this.scores[Colony.green]);
		ah.doSomething()
		ah.doSomething()
		ah.doSomething()
		ah.doSomething()
		ah.doSomething()
		ah.doSomething()
		ah.doSomething()
		ah.doSomething()
		console.log(ah.getEnergy());
		console.log(ah.studentWorld.getActorsAt(1,3));
		console.log(this.scores[Colony.green]);

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
		let anwp = new Ant(this, 1, 5, Colony.blue, 'p2', 'ant');
		this.addActor(anwp);
		console.log(anwp.stunned + " " + anwp.sleepTicks);
		wp.doSomething();
		console.log(anwp.stunned + " " + anwp.sleepTicks);


		let po = new Poison(this, 1, 6);
		this.addActor(po);
		console.log("---Poison---");
		let anpo = new Ant(this, 1, 6, Colony.blue, 'p2', 'ant');
		this.addActor(anpo);
		console.log(anpo.getEnergy());
		po.doSomething();
		console.log(anpo.getEnergy());

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
		let ff = new Food(this, 4, 7, START_FOOD_ENERGY);
		this.addActor(ff);
		any.pickupAndEatFood(50);
		console.log(ff.getEnergy());
		console.log(any.getEnergy());
		console.log(anb.getX() + " " + anb.getY() + " " + anb.getXYInFrontOfMe());
		console.log(anb.destX + " " + anb.destY);
		console.log(anb.moveForwardIfPossible());
		console.log(anb.destX + " " + anb.destY);
		console.log(this.canMoveTo(1,1));
		console.log(this.canMoveTo(1,2));
		console.log(this.canMoveTo(2,1));

		let bg = new BabyGrasshopper(this, 1, 8);
		this.addActor(bg);
		console.log("---BabyGrasshopper---");
		console.log(bg.walkDist);
		console.log(bg.getDirection());
		console.log(bg.isEnemy(Colony.yellow));

		let ag = new AdultGrasshopper(this, 1, 9);
		this.addActor(ag);
		console.log("---AdultGrashopper---")
		
		console.log("---studentWorld---")
		console.log(this.getActorsAt(1, 1));
		console.log(this.getEdibleAt(1, 2));
		console.log(this.getEdibleAt(1, 9));
		//end temporary test all 



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
		// increment tick count
        this.ticks++;

        // clear the moved boolean for all actors
        for(var i = 0; i < 64; i++){
            for(var j = 0; j < 64; j++){
                for(var k = 0; k < this.map[i][j].length; k++){
                    this.map[i][j][k].setMoved(false);
                }
            }
        }

        // if the actor has not already moved, move it and set its moved boolean to true
		// if actor is not in original location, delete it from original location and insert in new one
		for(var i = 0; i < 64; i++){
			for(var j = 0; j < 64; j++){
				for(var k = 0; k < this.map[i][j].length; k++){
					var currActor = this.map[i][j][k];
					var origX = currActor.getX();
					var origY = currActor.getY();
					if(!currActor.hasMoved()) {
                        currActor.doSomething();
                        currActor.setMoved(true);

                        if(origX !== currActor.getX() || origY !== currActor.getY()){
                        	this.map[i][j].splice(k, 1);
                        	k--;
                        	this.map[currActor.getX()][currActor.getY()].push(currActor);
						}
                    }
				}
			}
		}
	}

	cleanUp(){
	}
	
	canMoveTo(toX, toY){
		if (toX < 0 || toX >= VIEW_WIDTH || toY < 0 || toY >= VIEW_HEIGHT)
        	return false;

        let actors = this.getActorsAt(toX, toY);
		if (actors.length == 0)
			return true;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].blocksMovement()){
				return false
			}
		}

		return true;
	}

	addActor(actor){
		this.map[actor.getX()][actor.getY()].push(actor);
	}

	getEdibleAt(x, y){
		let actors = this.getActorsAt(x, y);
		if (actors.length == 0)
			return;

		for (let i = 0; i < actors.length; i++){
			if (actors[i].isEdible() && !actors[i].isDead()){
				return actors[i];
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
		let actors = this.getActorsAt(x, y);
		if (actors.length == 0)
			return;

		for (let i = 0; i < actors.length; i++){
			if (!actors[i].isDead()){
				actors[i].getPoisoned();
			}
		}
	}

	stunAllStunnableAt(x, y){
	    let actors = this.getActorsAt(x, y);
		if (actors.length == 0)
			return;

		for (let i = 0; i < actors.length; i++){
			if (!actors[i].isDead()){
				actors[i].getStunned();
			}
		}
	}

	increaseScore(colonyNum){
		this.scores[colonyNum]++;
		if (this.scores[colonyNum] > this.winningScore)
			this.winningScore = this.scores[colonyNum];
	}

	getActorsAt(x, y){
		return this.map[x][y];
	}

	removeDeadActors(){
	}

	updateStats(){
	}

}
	
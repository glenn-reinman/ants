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
		let f = new Food(this.world, 1, 1, 100);
		this.world[1][1].push(f);
		let ah = new AntHill(this.world, 1, 2, Colony.green, 'p1');
		this.world[1][2].push(ah);

		let pb = new Pheromone(this.world, 1, 3, Colony.blue, Pheromone.pnone);
		this.world[1][3].push(pb);
		let pg = new Pheromone(this.world, 2, 3, Colony.green, Pheromone.pnone);
		this.world[2][3].push(pg);
		let pr = new Pheromone(this.world, 3, 3, Colony.red, Pheromone.pnone);
		this.world[3][3].push(pr);
		let py = new Pheromone(this.world, 4, 3, Colony.yellow, Pheromone.pnone);
		this.world[4][3].push(py);

		let wp = new WaterPool(this.world, 1, 4);
		this.world[1][4].push(wp);
		let po = new Poison(this.world, 1, 5);
		this.world[1][5].push(po);

		let anb = new Ant(this.world, 1, 6, Colony.blue, 'p2', 'ant');
		this.world[1][6].push(anb);
		let ang = new Ant(this.world, 2, 6, Colony.green, 'p2', 'ant');
		this.world[2][6].push(ang);
		let anr = new Ant(this.world, 3, 6, Colony.red, 'p2', 'ant');
		this.world[3][6].push(anr);
		let any = new Ant(this.world, 4, 6, Colony.yellow, 'p2', 'ant');
		this.world[4][6].push(any);

		let bg = new BabyGrasshopper(this.world, 1, 7);
		this.world[1][7].push(bg);
		let ag = new AdultGrasshopper(this.world, 1, 8);
		this.world[1][8].push(ag);
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
		
	eatFood(x, y, energy){
	}

	poisonAll(x, y){
	}

	stunAll(x, y){
	}

	biteOne(x, y, actor, damage){
	}

	biteEnemy(x, y, colony){
	}
		
	addFood(x, y, energy){
	}

	addPheromone(x, y, colony){
	}

	addAnt(x, y, colony, compiler, comp){
	}

	addAdult(x, y){
	}
		
	hasObstacle(x, y){
	}

	hasFood(x, y){
	}

	hasPheromone(x, y, colony){
	}

	hasEnemy(x, y, colony){
	}

	hasHill(x, y, colony){
	}

	hasDanger(x, y, colony){
	}

	getCompiler(colony){
	}

	eraseActor(x, y, actor, currActor){
	}

	getNumberOfAntsFor(colony){
	}

	getWinningAntColony(){
	}

	weHaveAWinningAnt(){
	}
}
	
// studentWorld.js

class StudentWorld extends GameWorld{
	constructor(){
		/*
		StudentWorld(std::string assetDir);

		m_numAnts0;
		m_numAnts1;
		m_numAnts2;
		m_numAnts3;
		m_numColonies;
		std::vector<Actor*> m_world[VIEW_WIDTH][VIEW_HEIGHT];
		Compiler* m_compilerForEntrant0;
		Compiler* m_compilerForEntrant1;
		Compiler* m_compilerForEntrant2;
		Compiler* m_compilerForEntrant3;
		m_ticks;
		*/
	}

	init(){
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

	addAnt(x, y, colony, compiler comp){
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
	
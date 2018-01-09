// gameWorld.js

class GameWorld{
	constructor(){
		this.winnerName = "";
	}

	setWinner(winner){
		this.winnerName = winner;
	}

	getWinnerName(){
		return this.winnerName;
	}
}
// consts.js

Direction = {
	none: '',
	up: '_up',
	right: '_right',
	down: '_down',
	left: '_left'
}

PheromoneType = {
	pnone: 0,
	ptype1: 1,
	ptype2: 2,
	ptype3: 3
}

Colony = {
	green: 'green',
	red: 'red',
	blue: 'blue',
	yellow: 'yellow'
}

const PEBBLE_DEPTH = 1;
const FOOD_DEPTH = 2;
const ANTHILL_DEPTH = 2;
const PHEROMONE_DEPTH = 2;
const ACTIVATING_OBJECT_DEPTH = 2
const INSECT_DEPTH = 1;

const DEATH_FOOD_AMOUNT = 100;
const START_FOOD_ENERGY = 6000;
const ANTHILL_START_FOOD = 8999;
const PHEROMONE_START_STRENGTH = 256;
const ANT_START_ENERGY = 1500;
const BABY_GRASSHOPPER_START_ENERGY = 500;
const ADULT_GRASSHOPPER_START_ENERGY = 1600;
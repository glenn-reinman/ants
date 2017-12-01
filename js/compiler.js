/*
command = {
	lineNum,
	opcode,
	operand1,
	operand2
}
*/
var opcode = {
	empty: -2,
	invalid: -1,
	label: 0,
	goto: 1,
	if: 2,
	emitPheromone: 3,
	faceRandomDirection: 4,
	rotateClockwise: 5,
	rotateCounterClockwise: 6,
	moveForward: 7,
	bite: 8,
	pickUpFood: 9,
	dropFood: 10,
	eatFood: 11,
	generateRandomNumber: 12,
}

var condition = {
	i_smell_danger_in_front_of_me: 1,
	i_smell_pheromone_in_front_of_me: 2,
	i_was_bit: 3,
	i_am_carrying_food: 4,
	i_am_hungry: 5,
	i_am_standing_on_my_anthill: 6,
	i_am_standing_on_food: 7,
	i_am_standing_with_an_enemy: 8,
	i_was_blocked_from_moving: 9,
	last_random_number_was_zero: 10,
}

function compile(source){
	var lines = source.split('\n');
	if(lines.length < 0){
		return [false, 0, "File is Empty"];
	}
	var colonyName = parseColonyName(lines[0]);
	if(colonyName.length < 1){
		return [false, 1, "Invalid colony specification at top of bug program"]
	}
	var labels = {};
	var program = [];
	for(var i = 1; i < lines.length; i++){
		var command = parseLine(lines[i],i+1);
		switch(command.opcode){
			case opcode.empty:
				break;
			case opcode.invalid:
				return [false, i+1, command.operand1];
			case opcode.label:
				if(labels.hasOwnProperty(command.operand1))
					return [false, i+1, "Duplicate label '" + command.operand1 +"'"];
				labels[command.operand1] = program.length;
				break;
			default:
				program.push(command);
		}
	}
	for(var i = 0; i < program.length; i++){
		if(program[i].opcode == opcode.goto){
			if(labels.hasOwnProperty(program[i].operand1))
				program[i].operand1 = labels[program[i].operand1]
			else {
				return [false, program[i].lineNum, "Unknown label '" + program[i].operand1+"'"];
			}
		}else if(program[i].opcode == opcode.if){
			if(labels.hasOwnProperty(program[i].operand2))
				program[i].operand2 = labels[program[i].operand2]
			else {
				return [false, program[i].lineNum, "Unknown label '" + program[i].operand2+"'"];
			}
		}
	}
	return [true, program.length, colonyName, program];
}
function parseColonyName(line){
	var tokens = tokenize(line);
	if(tokens[0] !== "colony:" || tokens.length > 2){
		return "";
	}
	return tokens[1];
}
function parseLine(line, lineNum){
	var command = {};
	command.lineNum = lineNum;
	var tokens = tokenize(line);
	if(tokens.length < 1){
		command.opcode = opcode.empty;
		return command;
	}
	if(!opcode[tokens[0]]){
		if(tokens.length == 1 && tokens[0].match(/^[A-z]+\:$/g)){
			command.opcode = opcode.label;
			command.operand1 = tokens[0].substring(0,tokens[0].length-1);
			return command;
		}
		command.opcode = opcode.invalid;
		command.operand1 = "Invalid command '" + tokens[0]+"'";
		return command;
	}
	switch(opcode[tokens[0]]){
		case opcode.generateRandomNumber:
			if(tokens.length != 2){
				command.opcode = opcode.invalid;
				command.operand1 = "The 'generateRandomNumber' command requires 1 argument";
				return command;
			}
			var max = parseInt(tokens[1],10)
			if(isNaN(max)){
				command.opcode = opcode.invalid;
				command.operand1 = "The 'generateRandomNumber' command requires an integer argument";
				return command;
			}
			command.opcode = opcode.generateRandomNumber;
			command.operand1 = max;
			return command;
		case opcode.goto:
			if(tokens.length != 2){
				command.opcode = opcode.invalid;
				command.operand1 = "The 'goto' command requires 1 argument";
				return command;
			}
			command.opcode = opcode.goto;
			command.operand1 = tokens[1];
			return command;
		case opcode.if:
			if(tokens.length != 5 ||
				tokens[2] !== "then" ||
				tokens[3] !== "goto"){
					command.opcode = opcode.invalid;
					command.operand1 = "Incorrect syntax for if statement";
					return command;
				}
			if(!condition.hasOwnProperty(tokens[1])){
				command.opcode = opcode.invalid;
				command.operand1 = "Unknown Condition '" + tokens[1]+"'";
				return command;
			}
			command.opcode = opcode.if;
			command.operand1 = condition[tokens[1]];
			command.operand2 = tokens[4];
			return command;
		default:
			if(tokens.length != 1){
				command.opcode = opcode.invalid;
				command.operand1 = "The '" + tokens[0] + "' command does not take any arguments";
				return command;
			}
			command.opcode = opcode[tokens[0]];
			return command;
	}
}
function tokenize(line){
	var splits = line.split(/\s+/g);
	var tokens = [];
	for(var i = 0; i < splits.length; i++){
		if(splits[i].length < 1)
			continue;
		if(splits[i].startsWith("//"))
			return tokens;
		tokens.push(splits[i]);
	}
	return tokens;
}

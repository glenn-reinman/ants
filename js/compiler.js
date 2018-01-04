// compiler.js

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
			case Opcode.empty:
				break;
			case Opcode.invalid:
				return [false, i+1, command.operand1];
			case Opcode.label:
				if(labels.hasOwnProperty(command.operand1))
					return [false, i+1, "Duplicate label '" + command.operand1 +"'"];
				labels[command.operand1] = program.length;
				break;
			default:
				program.push(command);
		}
	}
	for(var i = 0; i < program.length; i++){
		if(program[i].opcode == Opcode.goto){
			if(labels.hasOwnProperty(program[i].operand1))
				program[i].operand1 = labels[program[i].operand1]
			else {
				return [false, program[i].lineNum, "Unknown label '" + program[i].operand1+"'"];
			}
		}else if(program[i].opcode == Opcode.if){
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
		command.opcode = Opcode.empty;
		return command;
	}
	if(!Opcode[tokens[0]]){
		if(tokens.length == 1 && tokens[0].match(/^[A-z]+\:$/g)){
			command.opcode = Opcode.label;
			command.operand1 = tokens[0].substring(0,tokens[0].length-1);
			return command;
		}
		command.opcode = Opcode.invalid;
		command.operand1 = "Invalid command '" + tokens[0]+"'";
		return command;
	}
	switch(Opcode[tokens[0]]){
		case Opcode.generateRandomNumber:
			if(tokens.length != 2){
				command.opcode = Opcode.invalid;
				command.operand1 = "The 'generateRandomNumber' command requires 1 argument";
				return command;
			}
			var max = parseInt(tokens[1],10)
			if(isNaN(max)){
				command.opcode = Opcode.invalid;
				command.operand1 = "The 'generateRandomNumber' command requires an integer argument";
				return command;
			}
			command.opcode = Opcode.generateRandomNumber;
			command.operand1 = max;
			return command;
		case Opcode.goto:
			if(tokens.length != 2){
				command.opcode = Opcode.invalid;
				command.operand1 = "The 'goto' command requires 1 argument";
				return command;
			}
			command.opcode = Opcode.goto;
			command.operand1 = tokens[1];
			return command;
		case Opcode.if:
			if(tokens.length != 5 ||
				tokens[2] !== "then" ||
				tokens[3] !== "goto"){
					command.opcode = Opcode.invalid;
					command.operand1 = "Incorrect syntax for if statement";
					return command;
				}
			if(!Condition.hasOwnProperty(tokens[1])){
				command.opcode = Opcode.invalid;
				command.operand1 = "Unknown Condition '" + tokens[1]+"'";
				return command;
			}
			command.opcode = Opcode.if;
			command.operand1 = Condition[tokens[1]];
			command.operand2 = tokens[4];
			return command;
		case Opcode.emitPheromone:
			if(tokens.length != 2){
				command.opcode = Opcode.invalid;
				command.operand1 = "The 'emitPheromone' command requires exactly 1 argument";
				return command;
			}
			if(isNaN(parseInt(tokens[1])) || parseInt(tokens[1]) < 0 || parseInt(tokens[1]) > 3){
				command.opcode = Opcode.invalid;
				command.operand1 = "The 'emitPheromone' command requires an integer argument between 0 and 3";
				return command;
			}
			command.opcode = Opcode.emitPheromone;
			command.operand1 = parseInt(tokens[1]);
			return command;
		case Opcode.rememberPheromone:
			if(tokens.length != 2){
				command.opcode = Opcode.invalid;
				command.operand1 = "The 'rememberPheromone' command requires exactly 1 argument";
				return command;
			}
			if(isNaN(parseInt(tokens[1])) || parseInt(tokens[1]) < 0 || parseInt(tokens[1]) > 3){
				command.opcode = Opcode.invalid;
				command.operand1 = "The 'rememberPheromone' command requires an integer argument between 0 and 3";
				return command;
			}
			command.opcode = Opcode.rememberPheromone;
			command.operand1 = parseInt(tokens[1]);
			return command;
		default:
			if(tokens.length != 1){
				command.opcode = Opcode.invalid;
				command.operand1 = "The '" + tokens[0] + "' command does not take any arguments";
				return command;
			}
			command.opcode = Opcode[tokens[0]];
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

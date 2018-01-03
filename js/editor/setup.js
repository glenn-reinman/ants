var startText = `colony: DumbAnt
// this program controls a single ant and causes it to move
// around the field and do things.
// this ant moves around randomly, picks up food if it
// happens to stumble upon it, eats when it gets hungry,
// and will drop food on its anthill if it happens to be
// stumble back on its anthill while holding food.
// here are the ant’s programming instructions, written
// in our "Bugs!" language

start:
    faceRandomDirection // face some random direction
    moveForward // move forward
    if i_am_standing_on_food then goto on_food
    if i_am_hungry then goto eat_food
    if i_am_standing_on_my_anthill then goto on_hill
    goto start // jump back to the "start:" line
on_food:
    pickUpFood
    goto start // jump back to the "start:" line
eat_food:
    eatFood // assumes we have food – I hope we do!
    goto start // jump back to the "start:" line
on_hill:
    dropFood // feed the anthill’s queen ant so she
    // can produce more ants for the colony
    goto start // jump back to the "start:" line`;
document.getElementById("ide").innerHTML = startText;
document.getElementById("terminal").innerHTML = "Press 'Compile' to Load Your Program";
var editor = ace.edit("ide");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/bug");
var terminal = ace.edit("terminal");
terminal.setTheme("ace/theme/vibrant_ink");
terminal.setReadOnly(true);
terminal.setHighlightActiveLine(false);
document.getElementById("terminal").removeAttribute("tabIndex");

function compileCode(){
    terminal.setValue("Compiling...\n");
    terminal.gotoLine(2);
    var result = compile(editor.getValue());
    if(result[0]){
        terminal.insert("Colony '" + result[2] + "' successfully compiled (" + result[1]+")");
        console.log(result);
    }else{
        terminal.insert("ERROR (Line "+result[1]+"): "+result[2]);
    }
    terminal.clearSelection();

}

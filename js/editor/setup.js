var editor = ace.edit("ide");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/bug");
var terminal = ace.edit("terminal");
terminal.setTheme("ace/theme/vibrant_ink");
terminal.setReadOnly(true);
terminal.setHighlightActiveLine(false);
function compileCode(){
    terminal.setValue("Compiling...\n");
    terminal.gotoLine(2);
    var result = compile(editor.getValue());
    if(result[0]){
        terminal.insert("Colony '" + result[2] + "' successfully compiled (" + result[1]+")");
    }else{
        terminal.insert("ERROR (Line "+result[1]+"): "+result[2]);
    }
    terminal.clearSelection();

}

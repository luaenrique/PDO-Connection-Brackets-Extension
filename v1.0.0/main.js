define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        Menus          = brackets.getModule("command/Menus"),
        EditorManager  = brackets.getModule("editor/EditorManager");

    
    // Alt - T function
    function generateConnection() {
        var currentDoc = DocumentManager.getCurrentDocument();
        var editor = EditorManager.getCurrentFullEditor();
        var pos = editor.getCursorPos();
        var myConnectionInfo = editor.document.getText();
        
        var ConnectionString = myConnectionInfo.match(new RegExp("ConInfo(" + "(.*)" + ");"));
        ConnectionString[1] = ConnectionString[1].substring(0, ConnectionString[1].length - 1); 
        ConnectionString[1] = ConnectionString[1].slice(1); 
        
        var myConnection = ConnectionString[1].split(":::");
        
        editor.document.replaceRange("<?php \n try { \n $connection = new PDO('mysql:host="+myConnection[1]+";dbname="+myConnection[3]+"','"+ myConnection[5]+"','"+myConnection[7]+"'); \n} \n catch (PDOException $e) { \n echo $e->getMessage(); \n} \n?>", pos);
    }
    
    //Alt - Y function
    function generateConnection2(){
        var currentDoc = DocumentManager.getCurrentDocument();
        var editor = EditorManager.getCurrentFullEditor();
        var insertionPos = editor.getCursorPos();
        var myConnectionInfo = editor.document.replaceRange("ConInfo(host:::YourHostHere:::dbname:::YourDbNameHere:::user:::YourUserHere:::pass:::YourPasswordHere);\n", insertionPos);
    }
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "pdoconnection.generateConCode";   
    var MY_COMMAND_ID2 = "pdoconnection.generateConToFill";  
    CommandManager.register("Generate Connection", MY_COMMAND_ID, generateConnection);
    CommandManager.register("Generate String For Connection", MY_COMMAND_ID2, generateConnection2);


    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    /*Setting up menu items*/
    menu.addMenuItem(MY_COMMAND_ID, "Alt-T"); 
    menu.addMenuItem(MY_COMMAND_ID2, "Alt-Y");
});

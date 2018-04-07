
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
        if(myConnection.length == 10){
            editor.document.replaceRange("<?php \n /*Defining the database information through constants*/ \n /*Definindo as informações do banco através de constantes*/ \n \t define('DB_HOST', '"+myConnection[3]+"');\n \t define('DB_NAME', '"+myConnection[5]+"'); \n \t define('DB_USER', '"+myConnection[7]+"');\n \t define('DB_PASS', '"+myConnection[9]+"');  \n \t class "+myConnection[1]+"{\n \t\t private static $instance; \n \t\t  \t\t public static function getInstance(){ \n \t\t\t if(!isset(self::$instance)){ \n \t\t\t\t try {\n                   \t\t self::$instance = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS); \n \t\t\t\t\t\t self::$instance->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); \n \t\t\t\t\t\t self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);\n \t\t\t\t}catch (PDOException $e) {\n \t\t\t\t\t echo $e->getMessage();\n \t\t\t\t}\n \t\t\t}\n \t\t\t return self::$instance; \n \t\t}\n \t\t public static function prepare($sql){ \n \t\t\t return self::getInstance()->prepare($sql); \n \t\t } \n \t }\n ?>", pos);
        }else{
            editor.document.replaceRange("<?php \n \ttry { \n \t\t$connection = new PDO('mysql:host="+myConnection[1]+";dbname="+myConnection[3]+"','"+ myConnection[5]+"','"+myConnection[7]+"'); \n\t} \n\tcatch (PDOException $e) { \n \t\techo $e->getMessage(); \n\t} \n?>", pos);
        }
    }
    
   
    //Alt - Y function
    function generateConnection2(){
        var currentDoc = DocumentManager.getCurrentDocument();
        var editor = EditorManager.getCurrentFullEditor();
        var insertionPos = editor.getCursorPos();
        var myConnectionInfo = editor.document.replaceRange("ConInfo(host:::YourHostHere:::dbname:::YourDbNameHere:::user:::YourUserHere:::pass:::YourPasswordHere);\n", insertionPos);
    }
    
    //Alt - U function
    function generateConnectionwClass(){
        var currentDoc = DocumentManager.getCurrentDocument();
        var editor = EditorManager.getCurrentFullEditor();
        var insertionPos = editor.getCursorPos();
        var myConnectionInfo = editor.document.replaceRange("ConInfo(classname:::YourClassHere:::host:::YourHostHere:::dbname:::YourDbNameHere:::user:::YourUserHere:::pass:::YourPasswordHere);\n", insertionPos);
    }
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "pdoconnection.generateConCode";   
    var MY_COMMAND_ID2 = "pdoconnection.generateConToFill";  
    var MY_COMMAND_ID3 = "pdoconnection.generateConWClass";  
    CommandManager.register("Generate Connection", MY_COMMAND_ID, generateConnection);
    CommandManager.register("Generate String For Connection", MY_COMMAND_ID2, generateConnection2);
    CommandManager.register("Generate String For Connection w/ Class", MY_COMMAND_ID3, generateConnectionwClass);


    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    /*Setting up menu items*/
    menu.addMenuItem(MY_COMMAND_ID2, "Alt-Y");
    menu.addMenuItem(MY_COMMAND_ID3, "Alt-U");
    menu.addMenuItem(MY_COMMAND_ID, "Alt-T"); 
});

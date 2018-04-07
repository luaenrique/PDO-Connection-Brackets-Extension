# PDO Connection Brackets Extension
[🐘] This repository contains an extension developed to help bracket users to create their pdo connections in PHP.


I was always interested in create something for an open source software, so I choosed brackets to do it =).

# Why Brackets?
Particularly, I really like web development, and as brackets is a text editor used in the most part of the time for web development
I've decided to study more about the extensions development and create something useful for PHP.

# How to use?

# Version 1.0.0

If you press Alt + Y the extension will give you the following code: ConInfo(host:::YourHostHere:::dbname:::YourDbNameHere:::user:::YourUserHere:::pass:::YourPasswordHere);
You just have to change the informations according to your connection info.

Then you just have to press Alt + T and your connection code will just appear in your screen =).

# Version 2.0.0

If you press Alt + Y the extension will give you the following code: ConInfo(host:::YourHostHere:::dbname:::YourDbNameHere:::user:::YourUserHere:::pass:::YourPasswordHere);
You just have to change the informations according to your connection info.
And after press Alt + T, you will get this code: 

<?php 
 	try { 
 		$connection = new PDO('mysql:host=YourHostHere;dbname=YourDbNameHere','YourUserHere','YourPasswordHere'); 
	} 
	catch (PDOException $e) { 
 		echo $e->getMessage(); 
	} 
?>


If you press Alt + U the extensions will give you the following code: 
ConInfo(classname:::YourClassHere:::host:::YourHostHere:::dbname:::YourDbNameHere:::user:::YourUserHere:::pass:::YourPasswordHere);
And after press Alt + T, you will get this code: 

<?php 
 /*Defining the database information through constants*/ 
 /*Definindo as informações do banco através de constantes*/ 
 	 define('DB_HOST', 'YourHostHere');
 	 define('DB_NAME', 'YourDbNameHere'); 
 	 define('DB_USER', 'YourUserHere');
 	 define('DB_PASS', 'YourPasswordHere');  
 	 class YourClassHere{
 		 private static $instance; 
 		  		 public static function getInstance(){ 
 			 if(!isset(self::$instance)){ 
 				 try {
             self::$instance = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS); 
 						 self::$instance->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
 						 self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
 				}catch (PDOException $e) {
 					 echo $e->getMessage();
 				}
 			}
 			 return self::$instance; 
 		}
 		 public static function prepare($sql){ 
 			 return self::getInstance()->prepare($sql); 
 		 } 
 	 }
 ?>


Please, leave a feedback, so I will know what I can improve in this. =)

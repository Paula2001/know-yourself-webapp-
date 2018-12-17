<?php
namespace App\Models ;
use mysqli ;
/**
 * Home model
 *
 * PHP version 7.2.11
 */
class Log extends \Core\Model{

    public static function login($email ,$user_pass){
        $dp = self::getDB();
        $query = "SELECT id ,password ,first_name from users where email =  ?; ";
        $stmt = $dp->prepare($query);
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->bind_result($id ,$password,$first_name);
        if($stmt->fetch()){
            return (password_verify($user_pass,$password)) ? array('id' => $id ,'first_name' => $first_name): false ;
        }else{
            return false ;
        }
    }
}
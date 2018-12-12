<?php
    namespace App\Models ;
    use mysqli ;
    class Reg extends \Core\Model {
        public static function insertData($id,$firstName,$lastName,$passwd,$email,$age,$gender,$currentTime){
            $dp = self::getDB();
            $query = "INSERT INTO
             `users`(`id`, `first_name`, `last_name`, `password`, `email`, `age`, `gender`, `time_account_created`)
                VALUES (?,?,?,?,?,?,?,?)";
            $stmt = $dp->prepare($query);
            $stmt->bind_param('ssssssis',$id,$firstName,$lastName,$passwd,$email,$age,$gender,$currentTime);
            $stmt->execute();

            return  ($stmt->affected_rows) ? true : false ;

        }
        public static function checkEmail(string $emailInput){
            $dp = self::getDB();
            $emailInput = $emailInput . '%';
            $query = "SELECT email FROM users WHERE email LIKE  ?  ";
            $stmt = $dp->prepare($query);
            $stmt->bind_param('s',$emailInput);
            $stmt->execute();
            $stmt->bind_result($emailResult);
            return ($stmt->fetch()) ? $emailResult : $emailResult  ;
        }
    }
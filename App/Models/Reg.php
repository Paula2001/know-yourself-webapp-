<?php
    namespace App\Models ;
    use mysqli ;
    class Reg extends \Core\Model {
        public static function insertData($id,$firstName,$lastName,$passwd,$email,$age,$gender,$currentTime){
            $dp = self::getDB();
            $query = "INSERT INTO
             `users`(`id`, `first_name`, `last_name`, `password`, `email`, `age`, `gender`, `time_account_created`)
                VALUES (?,?,?,?,?,?,?,?)";
                $df = new mysqli();
            $stmt = $dp->prepare($query);
            $stmt->bind_param('isssssis',$id,$firstName,$lastName,$passwd,$email,$age,$gender,$currentTime);
            $stmt->execute();
            echo  $stmt->affected_rows ; 
        }

    }
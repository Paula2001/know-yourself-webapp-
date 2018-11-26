<?php
    namespace App\Models ;
    use mysqli ;
    /**
     * Home model
     *
     * PHP version 7.2.11
     */
    class Hom extends \Core\Model{
        /**
         * @param void
         *
         * Get posts
         *
         * @return void
         */
        public function getPosts($var){
            $dp = self::getDB();
            $query1 = "SELECT * FROM `users` WHERE `first_name` LIKE '".trim($var).'%'."'";
            $stmt = $dp->query($query1);
            if($stmt) {
                $results = $stmt->fetch_all(MYSQLI_NUM);
                return $results ;
            }else{
                return;
            }


        }
    }
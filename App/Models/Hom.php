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
         * @return array|int
         */
        public function getPosts($var){
            $dp = self::getDB();
            $query1 = "SELECT * FROM `users` 
              WHERE CONCAT(`first_name`, ' ', `last_name`)   LIKE '".trim($var).'%'."'
                OR `last_name`  LIKE '".trim($var).'%'."'";
            $stmt = $dp->query($query1);

            return ($stmt) ? $stmt->fetch_all(MYSQLI_ASSOC): 0  ;
        }
    }
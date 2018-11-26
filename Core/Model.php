<?php

namespace Core;

use mysqli;
use App\Config;

/**
 * Base model
 *
 * PHP version 5.4
 */
abstract class Model
{

    /**
     * Get the PDO database connection
     *
     * @return mixed
     */
    protected static function getDB()
    {
        static $db = null;

        if ($db === null) {
    
            try {
                $db = new mysqli(Config::DB_HOST,Config::DB_USER,Config::DB_PASSWORD ,Config::DB_NAME);

            } catch (mysqliException $e) {
                echo $e->getMessage();
                die();
            }
        }

        return $db;
    }
}

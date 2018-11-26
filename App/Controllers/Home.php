<?php

namespace App\Controllers;

use \Core\View;
use App\Models\Hom ;

/**
 * Home controller
 *
 * PHP version 5.4
 */
class Home extends \Core\Controller
{

    /**
     * Before filter
     *
     * @return void
     */
    protected function before()
    {
        //echo "(before) ";
        //return false;
    }

    /**
     * After filter
     *
     * @return void
     */
    protected function after()
    {
        //echo " (after)";
    }

    /**
     * Show the index page
     *
     * @return void
     */
    public function indexAction()
    {
        if(isset($_POST['ajax']) ) {
            $posts = Hom::getPosts($_POST['name']);
            $arr = $posts;
            $_SESSION['data'] = json_encode($arr);
        }

        View::render('Home/index.php');
    }

}

<?php

namespace App\Controllers;

use \Core\View;

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
        $_SESSION['data'] = 'yarab tsht3';

        View::render('Home/index.php');


//        View::renderTemplate('Home/index.html', [
//            'name'    => 'Dave',
//            'colours' => ['red', 'green', 'blue']
//        ]);
    }
}

<?php

namespace App\Controllers;

use \Core\View;
use App\Models\Hom ;
use App\Views\BaseView;
/**
 * Home controller
 *
 * PHP version 5.4
 */
class Home extends \Core\Controller
{

    /**
     * Show the index page
     *
     * @return void
     */
    public function indexAction()
    {


        View::render('Home/index.php');
    }

}

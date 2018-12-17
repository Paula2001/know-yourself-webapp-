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
        BaseView::navigation('');
        if(isset($_POST['ajax']) ) {
            $names = Hom::getPosts($_POST['name']);
            $arr = $names;
            $_SESSION['data'] = json_encode($arr);
        }

        View::render('Home/index.php');
    }

}

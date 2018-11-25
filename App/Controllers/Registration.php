<?php
namespace App\Controllers ;
use \Core\View ;
class Registration extends \Core\Controller{
    public function indexAction(){
        if(isset($_POST['reg'])){
            //model
        }
        View::render('Registration/index.php');
    }
}
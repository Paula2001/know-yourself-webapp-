<?php

namespace App\Controllers;

use \Core\View;
use App\Models\Log ;

/**
 * Login controller
 *
 * PHP version 5.4
 */
class Login extends \Core\Controller
{

    public function indexAction()
    {
        if(isset($_POST['submit'])){
            $login = Log::login($_POST['email'] ,$_POST['password']);
            if($login){
                $_SESSION['id'] = $login['id'] ;
                $_SESSION['name'] = $login['first_name'] ;
                header('Location: /home/index');
            }else{
                $error = "email or password is not correct";
                View::render('Login/index.php' , [$error]);
            }
        }
        View::render('Login/index.php');
    }

}

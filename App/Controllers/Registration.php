<?php
namespace App\Controllers ;
use App\Models\Reg;
use \Core\View ;
class Registration extends \Core\Controller{
    /**
    *
    * loading the registration index
    *
    * @return void
    */
    public function indexAction(){

        View::render('Registration/index.php');
    }
    /**
    *
    * submitting the request handler
    *
    * @return void
    *
    */
    public function completeAction(){
        if($this->modelProcessing()){
            $id = date('siHmd') - rand(111111111,99999999);
            $age = $_POST['years'] .'-'. $_POST['months'] .'-'. $_POST['days'];
            $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
            $currentTime = date('Y/m/d-H:i:s');
            Reg::insertData($id,
            $_POST['firstName'],
            $_POST['lastName'],
            $password,
            $_POST['email'],
            $age ,
            $_POST['gender'],
            $currentTime
            );
        }

        View::render('Registration/complete.php');
    }
    /**
    *
    * checking on whether all the super globals which is suppose to be sent isset or not
    *
    * @return bool
    *
    */
    private function modelProcessing(){
        $arr = array('firstName' ,'lastName','password','email');
        for($i = 0;$i < sizeof($arr);$i++){
            if(!isset($_POST[$arr[$i]])){
                return false ;
            }
        }

        return true ;
    }
}
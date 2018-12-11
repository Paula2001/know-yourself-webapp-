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

        if(isset($_POST['ajax'])) {
            $resultEncode = json_encode(Reg::checkEmail($_POST['name']));
            $_SESSION['data'] = $resultEncode;
        }
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
            $id = $this->generateRandom();
            $age = $_POST['years'] .'-'. $_POST['months'] .'-'. $_POST['days'];
            $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
            $currentTime = date('Y/m/d-H:i:s');

            if(Reg::insertData($id,
            $_POST['firstName'],
            $_POST['lastName'],
            $password,
            $_POST['email'],
            $age ,
            $_POST['gender'],
            $currentTime
            )){
                echo '<p class="success">You\'ve joined our big famous yarab sam7ne 3ala 2l kdb dh website</p>' ;
                echo '<a href="/home/index" class="success">click here to login</a>' ;
            };

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

    /**
     * generate random id consist of email as a salt factor
     *
     * @return string
     */
    private function generateRandom(){

        $string = $_POST['email'];
        $string = str_replace("@","",$string);
        $string = preg_replace("/\.[a-zA-Z]+/","",$string);
        $stringLen = strlen($string);
        $result = null ;
        $arr  = array('s' ,'i','H', 'm' ,'d');
        for($i = 0;$i < 3;$i++){
            $randomStr = null ;
            for ($j = 0;$j < 2;$j++){
                $randomStr .= $string[rand(0,$stringLen - 1)] ;
            }
            $result .= date($arr[$i]) . $randomStr ;
        }
        return $result ;
    }
}
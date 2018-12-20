<?php
namespace App\Controllers ;
use App\Models\Reg;
use \Core\View ;
class Registration extends \Core\Controller{
    private $id;
    /**
    *
    * loading the registration index
    *
    * @return void
    */
    public function indexAction(){
        if(isset($_COOKIE['set'])) {
            setcookie('set' ,'',time() - 1);
        }
        if(isset($_POST['ajax']) && $_POST['ajax'] === 'reg') {
            $resultEncode = json_encode(Reg::checkEmail($_POST['name']));
            $_SESSION['data'] = $resultEncode;
        }
        if(isset($_POST['submit'])){
            $this->id = $this->generateRandom();
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
        if(!isset($_COOKIE['set'])) {
            $id = $this->generateRandom();
            setcookie('set', $id, 0);
            $this->id = $id;
        }
            if($this->modelProcessing()){
            $age = $_POST['years'] .'-'. $_POST['months'] .'-'. $_POST['days'];
            $password = password_hash($_POST['password'],PASSWORD_DEFAULT);
            $currentTime = date('Y/m/d-H:i:s');

            Reg::insertData($this->id,
            $_POST['firstName'],
            $_POST['lastName'],
            $password,
            $_POST['email'],
            $age ,
            $_POST['gender'],
            $currentTime
            );
            $extension  = $this->imageUploading($this->id);

        }
        View::render('Registration/complete.php' , $this->convertToArray($age ,$extension) ) ;
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


    protected function before()
    {
        if(isset($_COOKIE['set'])) {
            $this->id = $_COOKIE['set'];
        }
        return true;
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

    /**
     * @param int $age
     * @param {string} $extension
     *
     * convert variables to array to pass it to the view
     *
     * @return array
     */
    private function convertToArray($age ,$extension){
        $image_name = $this->id . ".$extension" ;
        $name = ucfirst($_POST['firstName']) . " " .  ucfirst($_POST['lastName']) ;
        $email = $_POST['email'];
        $gender = ($_POST['gender'])? "Male" : "Female" ;
        return array('image_name' => $image_name,
            'name' => $name ,
            'email' => $email ,
            'age' => $age ,
            'gender' => $gender);
    }

}
<?php

namespace Core;

/**
 * Base controller
 *
 * PHP version 5.4
 */
abstract class Controller
{

    /**
     * Parameters from the matched route
     * @var array
     */
    protected $route_params = [];

    /**
     * Class constructor
     *
     * @param array $route_params  Parameters from the route
     *
     * @return void
     */
    public function __construct($route_params)
    {
        $this->route_params = $route_params;
    }

    /**
     * Magic method called when a non-existent or inaccessible method is
     * called on an object of this class. Used to execute before and after
     * filter methods on action methods. Action methods need to be named
     * with an "Action" suffix, e.g. indexAction, showAction etc.
     *
     * @param string $name  Method name
     * @param array $args Arguments passed to the method
     *
     * @return void
     */
    public function __call($name, $args)
    {
        $method = $name . 'Action';

        if (method_exists($this, $method)) {
            if ($this->before() !== false) {
                $this->logout();
                call_user_func_array([$this, $method], $args);
                $this->after();
            }
        } else {
            echo "Method $method not found in controller " . get_class($this);
        }
    }

    /**
     * Before filter - called before an action method.
     *
     * @return BOOLEAN
     */
    protected function before()
    {


    }

    /**
     * logout function un set session id
     */
    private function logout(){
        if(isset($_POST['logout'])) {
            unset($_SESSION['id']);
        }
    }

    /**
     * After filter - called after an action method.
     *
     * @return void
     */
    protected function after()
    {
    }

    /**
     * @param int $id
     * @param string $buttonName
     *
     * this method handles image uploads and return a string
     *
     * @return string
     */
    protected function imageUploading($id , $buttonName = 'submit' ){
        if(isset($_POST[$buttonName])){
            $fileOriName = $_FILES['image']['name'];
            $fileSize = $_FILES['image']['size'];
            $fileTmp =$_FILES['image']['tmp_name'];
            $fileType=$_FILES['image']['type'];
            $types = array('jpg','png','gif','jpeg');
            $errors = array() ;
            $fileExt = preg_match('/\w+\z/',$fileOriName,$extension );
            if($fileSize > 2097152){
                array_push($errors ,'exceed size');
            }
            if(!in_array($extension[0],$types)){
                array_push($errors,'not a valid type');
            }

            if(!empty($errors)){
                print_r($errors);
            }else{
                $uploadedFile = "uploads/".$id.".$extension[0]" ;
                move_uploaded_file($fileTmp,$uploadedFile);
                return $extension[0];
            }

        }
    }
}

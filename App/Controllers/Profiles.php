<?php
namespace App\Controllers ;

use App\Models\Profile ;
use \Core\View ;

class Profiles extends \Core\Controller {
    public function indexAction(){
        $id = $this->getId();
        if(isset($_POST['submit'])){
            if(isset($_FILES['image']['name'])){
                $this->imageUploading($id, 'submit');
            }else {
                echo "asdasdasdasd";
            }
        }

        View::render('Profile/index.php',$this->viewArr($id));
    }

    private function imageFile(string $id,int $gender){
        $ext = array('jpg','png','gif','jpeg');
        $imageMale = '/images/male.jpg'  ;
        $imageFemale = '/images/female.png';
        for($i = 0;$i < 4;$i++) {
            $image = "../public/uploads/$id.$ext[$i]";
            if (file_exists($image)){
                $image = str_replace('../public','',$image);
                return $image;
            }
        }
        return ($gender) ?  $imageMale: $imageFemale ;
    }

    private function getId(){
        $id = $_SERVER['QUERY_STRING'];
        preg_match('/\/\w+\//',$id,$matches);
        $id = preg_replace('/\/+/','',$matches[0]);
        return $id;
    }




    private function viewArr(string $id){
        $view_arr = Profile::getUserData($id);
        $view_arr['image_file'] = $this->imageFile($id ,$view_arr['gender']);
        preg_match('/\w+-\w+-\w+/',$view_arr['time_account_created'],$match);
        $view_arr['time_account_created'] = $match[0];
        return $view_arr ;
    }
}
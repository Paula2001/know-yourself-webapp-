<?php
use App\Views\BaseView;
$file = dirname(__DIR__) . '/'.'BaseView.php';
require_once $file ;
echo BaseView::header('Complete Registration',['registration','main' ,'profileStyling']);

?>
<h2 id="mainText">We are so happy that you joined us ;) ,This your profile data</h2>
<div id="profile_container">
    <img id="profile_img" src="<?php echo '/uploads/'.$args[0] ;  ?>">
    <h2 class="profile_text">Name : <?php echo $args[1]; ?> </h2>
    <h2 class="profile_text">Email : <?php echo $args[2]; ?> </h2>
    <h2 class="profile_text">Date of birth : <?php echo $args[3]; ?> </h2>
    <h2 class="profile_text">Gender : <?php echo $args[4]; ?> </h2>
    <a id="proceed" href="/login/index">Proceed to login</a>
</div>

<?php
use App\Views\BaseView;
$file = dirname(__DIR__) . '/'.'BaseView.php';
require_once $file ;
echo BaseView::header('Login',['registration','main']);
?>
<body>
<h1 id="title">Login</h1>
<form id="regForm" action="" method="POST" >
    <div id="errorContainer"><?php if(isset($args[0])){echo "<p>$args[0]</p>";} ?></div>
    <div id="textArea">
        <input type="text" name="email" placeholder="Only Use your email" class="regTextField">
        <input type="password" name="password" placeholder="password" class="regTextField">
        <input type="submit" name="submit" value="Login   " id="submit">
    </div>


</form>

</body>
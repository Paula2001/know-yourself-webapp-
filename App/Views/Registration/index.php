<?php
use App\Views\BaseView;
$file = dirname(__DIR__) . '/'.'BaseView.php';
require_once $file ;
echo BaseView::header('Registration',['registration','main']);

?>
<body>

<h1 id="title">Create a new account</h1>
<form id="regForm" name="reg" method="post" action="complete">
    <div id="errorContainer"></div>
    <div id="textArea">

    </div>
    <birthday>
        <h3>Birthday</h3>

    </birthday>
    <br>
    <br>
    <gender>
        <input class="gender"   type="radio" value="1" name="gender">
        <label>Male</label>
        <input class="gender" checked type="radio" value="0" name="gender">
        <label>Female</label>
    </gender>
    <br>
    <br>
    <p id="btnText">**This button is disabled till you finish the form</p>
    <input value="Sign Up"  disabled  id="submit" type="submit">

</form>
<script src=/js/registration/registrationBin.js type='text/javascript'></script>

</body>
</html>

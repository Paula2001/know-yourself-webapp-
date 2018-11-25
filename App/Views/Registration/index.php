<?php
use App\Views\BaseView;
$file = dirname(__DIR__) . '/'.'BaseView.php';
require_once $file ;
echo BaseView::header('Registration',['registration','main']);
?>
<body>


<h1 id="title">Create a new account</h1>
<form id="regForm" name="reg" method="post" action="complete.php">
    <div id="errorContainer"></div>
    <input placeholder="First Name" onfocusout="registration.validateText(0)" type="text" class="regTextField" name="firstName">
    <input placeholder="Last Name" onfocusout="registration.validateText(1)" type="text" class="regTextField" name="lastName">
    <input placeholder="Password" onfocusout="registration.validateText(2)" type="password" class="regTextField" name="password">
    <input placeholder="Confirm your password" onfocusout="registration.validateText(3)" type="password" class="regTextField" name="password">
    <input placeholder="Email" type="email" onfocusout="registration.validateText(4)" class="regTextField" name="email">
    <birthday>
        <h3>Birthday</h3>
            <select  name="days"  class="age" onchange="registration.validateText(0,true)">
                <option>Day</option>
            </select>
            <select  name="months" class="age" onchange="registration.validateText(1,true)">
                <option>Month</option>
            </select>
            <select  name="years" class="age" onchange="registration.validateText(2,true)">
                <option>year</option>
            </select>
    </birthday>
    <br>
    <br>
    <gender>
        <input onchange="" class="gender"  type="radio" value="male" name="gender">
        <label>Male</label>
        <input onchange="" class="gender" checked type="radio" value="female" name="gender">
        <label>Female</label>
    </gender>
    <br>
    <br>
    <p id="btnText">**This button is disabled till you finish the form</p>
    <input value="Sign Up"  disabled  id="submit" type="submit">

</form>
<script src="/js/registration.js"></script>
<script>
        registration.addOptions();

</script>
</body>
</html>

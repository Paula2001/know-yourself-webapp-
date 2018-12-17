
<?php
use App\Views\BaseView;
$file = dirname(__DIR__) . '/'.'BaseView.php';
require_once $file ;
echo BaseView::header('Home');
?>

<body>
<?php

echo BaseView::navigation();
?>
<p id="note">This is a website kinda similar to saraha please don't send any sensitive data
through this website as it's for training proposes
<br>email : polagorge@gmail.com</p>

<script src=/js/search/searchBin.js type='text/javascript'></script>




</body>
</html>

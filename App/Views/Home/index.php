
<?php
use App\Views\BaseView;
$file = dirname(__DIR__) . '/'.'BaseView.php';
require_once $file ;
echo BaseView::header('Home');
?>

<body>
<?php
echo BaseView::navigation('index');
?>

<search>
    <input type='text'  autocomplete="off" placeholder='Search with name only' id='search'>
    <div id="ajax"></div>
</search>
<script src=/js/search/searchBin.js type='text/javascript'></script>




</body>
</html>

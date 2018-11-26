
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
    <input type='text'  autocomplete="off" placeholder='Search' id='search'>
    <div id="ajax"></div>
</search>
<script>
    ajax = new Ajax(true);

    window.onclick = function () {
        ajax.execute('[]');
    }
    document.getElementById('search').onkeyup = function(){ajax.request('search');}
</script>


</body>
</html>

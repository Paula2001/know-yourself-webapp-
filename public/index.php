
<script src="/js/jquery.js"></script>
<script src="/js/Ajax.js"></script>
<?php

/**
 * Front controller
 *
 * PHP version 5.4
 */


/**
 * Javascript lib.
 *
 */

/**
 * Composer
 */
require '../vendor/autoload.php';

/*
 *Sessions
 *
 */
session_start();
$_SESSION['login'] = true ;
/**
 * Twig
 */
Twig_Autoloader::register();


/**
 * Routing
 */
$router = new Core\Router();

// Add the routes
$router->add('', ['controller' => 'Home', 'action' => 'index']);
$router->add('{controller}/{action}');
$router->add('{controller}/{id:\d+}/{action}');
$router->add('admin/{controller}/{action}', ['namespace' => 'Admin']);
$router->dispatch($_SERVER['QUERY_STRING']);
if(isset($_GET['flag'])){
    $router->dispatch($_SERVER['QUERY_STRING']);
}



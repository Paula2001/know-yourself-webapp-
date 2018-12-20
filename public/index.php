
<script src="/js/jquery.js" type="text/javascript"></script>

<?php
/**
 *Sessions
 *
 */
session_start();

/**
 * Front controller
 *
 * PHP version 5.4
 */


/**
 * Composer
 */
require '../vendor/autoload.php';



/**
 * Routing
 */
$router = new Core\Router();

// Add the routes
$router->add('', ['controller' => 'Home', 'action' => 'index']);
$router->add('{controller}/{action}');
$router->add('{controller}/{id:\w+}/{action}');
$router->add('admin/{controller}/{action}', ['namespace' => 'Admin']);
$router->dispatch($_SERVER['QUERY_STRING']);





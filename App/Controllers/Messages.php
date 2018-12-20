<?php

namespace App\Controllers;

use App\Models\Message;
use \Core\View;

/**
 * Messages controller
 *
 * PHP version 5.4
 */
class Messages extends \Core\Controller
{

    /**
     * Show the index page
     *
     * @return void
     */
    public function indexAction()
    {
        $posts = Message::getAll();

        View::renderTemplate('Posts/index.html', [
            'posts' => $posts
        ]);
    }


    
    /**
     * Show the edit page
     *
     * @return void
     */
    public function editAction()
    {
        if(isset($GLOBALS['id'])) {
            $id = $GLOBALS['id'];
            echo $id;
        }
        echo 'Hello from the edit action in the Posts controller!';
    }
}

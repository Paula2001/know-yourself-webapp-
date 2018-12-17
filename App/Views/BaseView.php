<?php
namespace App\Views;

class BaseView
{

    /**
     * @param array $css_files
     * @param string $js_file
     *
     * css loading function
     *
     * @return void
     */

    static function loadFiles(array $css_files )
    {
        for ($i = 0; $i < sizeof($css_files); $i++) {
            $cssFile = $css_files[$i] . '.css';
            $css = '<link rel="stylesheet" href="/css/' . $cssFile . '" type="text/css"  />' . "\n";
            echo $css;
        }
    }

    /**
     *
     * choose between to sets of menu
     *
     * @return string
     *
     */
    static function navigation()
    {
        $name = (isset($_SESSION['name']))? $_SESSION['name']:0;
        $nav = "<nav>
                  <ul class='menuFrame'>
                  <form action='' method='post'>
                    <li style='margin: 0px;' class='linkNav'><input type='submit' name='logout' value='logOut'></li>
                   </form>
                    <li class='linkNav'><a href='#'>Messages</a></li>
                    <li class='linkNav'><a href='#'>$name</a></li>
                    <li class='searchNav'>
                        <input type='text'  autocomplete='off' placeholder='Search By Name' id='search'>
                        <div id='ajax'></div>
                    </li>
                  </ul>
                </nav>";
        $nav2 = '<nav>
                  <ul class="menuFrame">
                    <li class="linkNav"><a href="/login/index">LogIn</a></li>
                    <li class="linkNav"><a href="/registration/index">Registration</a></li>
                    
                    <li class="searchNav"><input type="text"  autocomplete="off" placeholder="Search By Name" id="search">
    <div id="ajax"></div>
</li>

                  </ul>
                </nav>';
        return (isset($_SESSION['id']))? $nav : $nav2 ;

    }

    /**
     * @param string $title
     *
     * @param array $cssElements
     *
     * this is the header function
     *
     * @return void
     */
    static function header(string $title ,array $cssElements = ['home','nav','main'])
    {
        echo "<!DOCTYPE html>
                <html>
                    <head>
                    <meta charset='UTF-8'>
                    <title> $title  </title>";
        self::loadFiles($cssElements);
        echo '</head>';
    }

}
<?php
namespace App\Views;

class BaseView
{

    /**
     * @param array $files
     *
     * css loading function
     *
     * @return void
     */

static function loadCssFiles(array $filesarr){
    for($i = 0; $i < sizeof($filesarr); $i++) {
        $cssFile =   $filesarr[$i] .'.css';
        $css = '<link rel="stylesheet" href="/css/' . $cssFile . '" type="text/css"  />' . "\n";
        echo $css;
    }
}
    /**
     * @param string menu
     *
     * choose between to sets of menu
     *
     * @return string
     *
     */
static function navigation(string $menu){
    $nav = '<nav>
                  <ul class="menuFrame">
                    <li class="link"><a href="#"></a> new stuff </li>
                    <li class="link"><a href="#"></a> new menu </li>
                    <li class="link"><a href="#"></a> SignUp</li>
                    <li class="search"><input type="text"> </li>
                  </ul>
                </nav>';
    $mainNav = '<nav>
                  <ul class="menuFrame">
                    <li class="linkNav"><a target="_blank" href="#"> Login </a></li>
                    <li class="linkNav"><a href="registration/index">SignUp</a> </li>
                  </ul>
                </nav>';
    if($menu === 'index'){
        return $mainNav ;
    }else{
        return $nav ;
    }
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
static function header(string $title ,array $cssElements = ['home','nav','main']){
    echo "<!DOCTYPE html>
                <html>
                    <head>
                    <meta charset='UTF-8'>
                    <title> $title  </title>";
                    self::loadCssFiles($cssElements);
                    echo '</head>';
}

}
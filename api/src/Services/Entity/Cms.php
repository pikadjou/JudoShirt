<?php

namespace App\Services\Entity;

class Cms
{
    public $id = 0;
    public $name = "";
    public $url = "";
    public $view = "";
    public $controller = "";
    
    function __construct($cms){
        if($cms === null){
            return;
        }
        
        $this->id = $cms->id;
        $this->name = $cms->name;
        $this->url = $cms->url;
        $this->view = $cms->view;

        $this->controller = $cms->controller;
        
    }
}

?>
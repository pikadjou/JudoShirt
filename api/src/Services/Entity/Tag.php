<?php

namespace App\Services\Entity;

class Tag
{
    public $id = 0;
    public $name = "";
    public $content = "";
    
    function __construct($tag){
        $this->id = $tag->id;
        $this->name = $tag->name;
        $this->content = $tag->content;
    }
}

?>
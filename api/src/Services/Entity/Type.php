<?php

namespace App\Services\Entity;

class Type
{
    public $id = 0;
    public $name = "";
    public $content = "";
    public $type = 1;
    
    
    function __construct($type){

        $this->id = $type->id;
        $this->name = $type->name;
        $this->content = $type->content;
        $this->type = $type->type;
    }
}

?>
<?php

namespace App\Services\Entity;

class Cookie
{
    public $name = "";
    public $value = "";
    public $time = 0;
    
    
    function __construct($name, $value, $time){
        
        $this->name = $name;
        $this->value = $value;
        $this->time = $time;
        
    }
}

?>
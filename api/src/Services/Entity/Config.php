<?php

namespace App\Services\Entity;

class Config
{
    public $name = "";
    public $value = "";
    
    function __construct($config){
        if($config === null){
            return;
        }
        
        $this->name = $config->name;
        $this->value = $config->value;
        
    }
}

?>
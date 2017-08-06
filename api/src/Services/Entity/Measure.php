<?php

namespace App\Services\Entity;

class Measure
{
    public $id = 0;
    public $name = "";
    public $value = "";
    
    function __construct($measure){
        if($measure === null){
            return;
        }
        
        $this->id = $measure->id;
        $this->name = $measure->name;
        $this->value = $measure->value;
        
    }
}

?>
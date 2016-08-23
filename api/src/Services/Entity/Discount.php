<?php

namespace App\Services\Entity;

class Discount
{
    public $id = 0;
    public $name = "";
    public $price = "";
    
    function __construct($discount){
        if($discount === null){
            return;
        }
        
        $this->id = 0;
        $this->name = (string)$discount->attributes('type', true);
        $this->price = (float)$discount->price->display;
        
    }
}

?>
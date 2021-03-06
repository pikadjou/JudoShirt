<?php

namespace App\Services\Entity;

use Cake\Utility\Inflector;

class View
{
    public $id = 0;
    public $name = "";
    public $shopId = 0;
    public $priority = 0;
    
    function __construct($size){
        if($size === null){
            return;
        }
        
        $this->id = $size->id;
        $this->name = $size->name;
        
        $this->shopId = $size->shopId;
        
        $this->priority = $size->priority;
    }
}

?>
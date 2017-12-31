<?php

namespace App\Services\Entity;

use Cake\Utility\Inflector;

class Appearance
{
    public $id = 0;
    public $name = "";
    public $color = "";
    public $thumbnail = "";
    public $shopId = 0;
    public $priority = 0;
    
    function __construct($appearance = null){
        if($appearance === null){
            return $this;
        }
        
        $this->id = $appearance->id;
        $this->name = $appearance->name;
        $this->color = $appearance->name;
        $this->thumbnail = $appearance->name;
        /*$this->shopId = $appearance->shopId;
        $this->priority = $appearance->priority;*/
    }
}

?>
<?php

namespace App\Services\Entity;

class Promotion
{
    public $id = 0;
    public $name = "";
    public $content = "";
    public $image = "";
    
    public $startDate = null;
    public $endDate = [];
    
    function __construct($promotion){
        if($promotion === null){
            return;
        }
        $this->id = $promotion->id;
        $this->name = $promotion->name;
        $this->content = $promotion->content;
        
        $this->image = $promotion->image;
        $this->startDate = $promotion->startDate;
        $this->endDate = $promotion->endDate;
    }
}

?>
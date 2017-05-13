<?php

namespace App\Services\Entity;

class Promotion
{
    public $id = 0;
    public $name = "";
    public $short = "";
    
    public $content = "";
    public $image = "";
    
    public $type = "";
    public $params = "";
    
    public $startDate = null;
    public $endDate = [];
    
    function __construct($promotion){
        if($promotion === null){
            return;
        }
        $this->id = $promotion->id;
        $this->name = $promotion->name;
        $this->short = $promotion->short;
        
        $this->content = $promotion->content;
        
        $this->type = $promotion->type;
        $this->params = $promotion->params;
        
        $this->image = $promotion->image;
        $this->startDate = $promotion->startDate;
        $this->endDate = $promotion->endDate;
    }
}

?>
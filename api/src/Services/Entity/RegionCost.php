<?php
namespace App\Services\Entity;

/**
 * Tag Entity.
 */
class RegionCost
{
    public $id = 0;
    
    public $rangeCost = [];
    
    function __construct($regionCost){
        if($regionCost === null){
            return;
        }
        
        $this->id = $regionCost->id;
        
        for($i = 0, $l = count($regionCost->rangeCost); $i < $l; $i++){
            $this->rangeCost[] = new \App\Services\Entity\RangeCost($regionCost->rangeCost[$i]);
        }
    }
}

<?php
namespace App\Services\Entity;

/**
 * Tag Entity.
 */
class Country
{
    public $name = "";
    public $iso = "";
    
    public $regionCost = null;
    
    function __construct($country){
        if($country === null){
            return;
        }
        
        $this->name = $country->name;
        $this->iso = $country->iso;

        if($country->regionCost){
            $this->regionCost = new \App\Services\Entity\RegionCost($country->regionCost);
        }
    }
}

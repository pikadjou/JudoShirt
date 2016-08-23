<?php
namespace App\Services\Entity;

/**
 * Tag Entity.
 */
class RangeCost
{
    public $rangeDown = 0;
    public $rangeUp = 0;
    public $price = 0;
    
    function __construct($rangeCost){
        if($rangeCost === null){
            return;
        }
        
        $this->rangeDown = $rangeCost->rangeDown;
        $this->rangeUp = $rangeCost->rangeUp;

        $this->price = $rangeCost->price;

        
    }
}

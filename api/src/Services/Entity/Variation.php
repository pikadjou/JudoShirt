<?php
namespace App\Services\Entity;

use Cake\ORM\Entity;

/**
 * Category Entity.
 */
class Variation
{
    public $id = 0;
    public $sizeId = "";
    public $appearanceId = "";

    function __construct($variation){
        if($variation === null){
            return;
        }
        
        $this->id = $variation->id;
        $this->sizeId = $variation->sizeId;
        $this->appearanceId = $variation->appearanceId;
    }
}

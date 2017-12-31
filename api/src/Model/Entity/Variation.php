<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Category Entity.
 */
class Variation
{
    public $id = 0;
    public $price = 0;
    public $image = "";
    
    public $sizeId = "";
    public $size = null;
    public $appearanceId = "";
    public $appearance = null;
    
}

<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Tag Entity.
 */
class Country extends Entity
{
    public $name = "";
    public $iso = "";
    
    public $regionCost = null;
}

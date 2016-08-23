<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Tag Entity.
 */
class RangeCost extends Entity
{
    public $rangeDown = 0;
    public $rangeUp = 0;
    public $price = 0;
}

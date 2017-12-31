<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Tag Entity.
 */
class Basket
{
    public $id = 0;
    
    public $items = [];

    public $checkoutLink = "";
    
    public $priceItems = 0;
    public $priceShipping = 0;
    public $priceTotal = 0;

    public $discounts = [];
}

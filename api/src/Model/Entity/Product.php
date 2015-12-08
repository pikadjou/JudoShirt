<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Tag Entity.
 */
class Product extends Entity
{

   /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'name' => true,
        'content' => true,
        'thumbnail' => true,
        'price' => true,
        'shopId' => true,
        'design_id' => true
    ];
}

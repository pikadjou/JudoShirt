<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Tag Entity.
 */
class Article extends Entity
{

   /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'name' => true,
        'slug' => true,
        'content' => true,
        'thumbnail' => true,
        'price' => true,
        'shopId' => true,
        'design_id' => true,
        'shop_id' => true,
        'idCustomShop' => true
    ];
}

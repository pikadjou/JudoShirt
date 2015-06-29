<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Design Entity.
 */
class Design extends Entity
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
        'header' => true,
        'idShop' => true,
        'idCustomShop' => true,
        'categories' => true,
        'tags' => true,
    ];
}

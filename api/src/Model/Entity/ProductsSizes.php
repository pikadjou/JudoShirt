<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * CategoriesDesign Entity.
 */
class ProductsSizes extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'product_id' => true,
        'size_id' => true,
        'product' => true,
        'size' => true
    ];
}

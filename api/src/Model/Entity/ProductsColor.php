<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * CategoriesDesign Entity.
 */
class ProductsColor extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'product_id' => true,
        'color_id' => true,
        'product' => true,
        'color' => true,
    ];
}

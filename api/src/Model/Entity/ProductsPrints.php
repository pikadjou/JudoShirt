<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * CategoriesDesign Entity.
 */
class ProductsPrints extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'product_id' => true,
        'print_id' => true,
        'product' => true,
        'print' => true
    ];
}

<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * CategoriesDesign Entity.
 */
class CategoriesDesign extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'category_id' => true,
        'design_id' => true,
        'category' => true,
        'design' => true,
    ];
}

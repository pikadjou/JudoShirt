<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * TagsDesign Entity.
 */
class TagsDesign extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'tagsId' => true,
        'designsId' => true,
    ];
}

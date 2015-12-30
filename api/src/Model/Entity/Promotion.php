<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Promotion Entity.
 */
class Promotion extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * @var array
     */
    protected $_accessible = [
        'name' => true,
        'content' => true,
        'image' => true,
        'type' => true,
        'params' => true,
        'startDate' => true,
        'endDate' => true
    ];
}

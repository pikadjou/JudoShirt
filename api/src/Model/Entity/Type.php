<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Type Entity.
 */
class Type
{
    public $id = 0;
    public $name = "";
    public $content = "";
    public $priority = 0;

    public $parent = 0;
    public $children = []; 
}

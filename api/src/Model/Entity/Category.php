<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Category Entity.
 */
class Category
{
    public $id = 0;
    public $name = "";
    public $content = "";
    public $visible = false;
    public $nbDesigns = 0;
    public $picture = "";

    public $parent = 0;
    public $children = []; 
}

<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Tag Entity.
 */
class Article
{
    public $id = 0;
    public $slug = "";
    public $name = "";
    public $content = "";	
    public $priority = 0;
    public $visible = true;	
    public $price = 0;	
    public $thumbnail = "";	
    public $extra = "";

    public $product = null;
    public $categories = [];
    public $sizes = [];
    public $appearances = [];
    public $variations = [];
    
}

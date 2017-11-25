<?php

namespace App\Services\Entity;

use Cake\Utility\Inflector;

class Category
{
    public $id = 0;
    public $name = "";
    public $url = "";
    
    public $content = "";
    
    public $parent = null;
    public $children = [];
    public $designs = [];
    
    
    function __construct($category){
        if($category === null){
            return;
        }
        $this->id = $category->id;
        $this->name = $category->name;
        $this->url = $this->id ."/". Inflector::slug($this->name);
        $this->parent = $category->parent;
        $this->content = $category->content;
        
        for($i = 0, $l = count($category->children); $i < $l; $i++){           
            $this->children[] = new \App\Services\Entity\Category($category->children[$i]);
        }
    }
}

?>
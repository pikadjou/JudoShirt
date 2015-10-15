<?php

namespace App\Services\Entity;

class Category
{
    public $id = 0;
    public $name = "";
    public $content = "";
    
    public $categories = [];
    
    function __construct($category){
        if($category === null){
            return;
        }
        $this->id = $category->id;
        $this->name = $category->name;
        $this->content = $category->content;
        
        for($i = 0, $l = count($design->categories); $i < $l; $i++){
            $this->categories[] = new \App\Services\Entity\Category($design->categories[$i]);
        };
    }
}

?>
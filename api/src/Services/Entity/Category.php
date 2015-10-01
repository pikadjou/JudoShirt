<?php

namespace App\Services\Entity;

class Category
{
    public $id = 0;
    public $name = "";
    public $content = "";
    
    function __construct($category){
        if($category === null){
            return;
        }
        $this->id = $category->id;
        $this->name = $category->name;
        $this->content = $category->content;
    }
}

?>
<?php

namespace App\Services\Entity;

class Product
{
    public $id = 0;
    public $name = "";
    public $content = "";
    public $price = "";
    public $thumbnail = "";
    public $shopId = 0;
    
    function __construct($product){
        if($product === null){
            return;
        }
        $this->id = $product->id;
        $this->name = $product->name;
        $this->content = $product->content;
        $this->price = $product->price;
        $this->thumbnail = $product->thumbnail;
        $this->shopId = $product->shopId;
    }
}

?>
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
    public $idCustomShop = 0;
    
    public $types = [];
    
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
        $this->idCustomShop = $product->idCustomShop;
        
        for($i = 0, $l = count($product->types); $i < $l; $i++){
            $this->types[] = new \App\Services\Entity\Type($product->types[$i]);
        }
    }
}

?>
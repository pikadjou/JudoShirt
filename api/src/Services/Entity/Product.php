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
    public $priority = 0;
    
    public $types = [];
    public $design = null;
    
    function __construct($product){
        if($product === null){
            return;
        }
        
        $this->id = $product->id;
        $this->name = $product->name;
        if(!$this->name){
            $this->name = $product->product->name;
        }
        $this->content = $product->content;
        $this->price = $product->price;
        $this->thumbnail = $product->thumbnail;
        $this->shopId = $product->shopId;
        $this->idCustomShop = $product->idCustomShop;
        
        $this->priority = $product->priority;
        if(!$this->priority || $this->priority === 0){
            $this->priority = $product->product->priority;
        }
        
        for($i = 0, $l = count($product->product->types); $i < $l; $i++){
            $this->types[] = new \App\Services\Entity\Type($product->product->types[$i]);
        }
        
        if($product->design){
             $this->design = new \App\Services\Entity\Design($product->design);
        }
    }
}

?>
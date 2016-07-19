<?php

namespace App\Services\Entity;

use Cake\Utility\Inflector;

class Product
{
    public $id = 0;
    public $name = "";
    public $url = "";
    public $content = "";
    public $price = "";
    public $thumbnail = "";
    public $shopId = 0;
    public $idCustomShop = 0;
    public $priority = 0;
//    
//    public $types = [];
//    public $design = null;
    
    function __construct($product){
        if($product === null){
            return;
        }
        
        $this->id = $product->id;
        $this->name = $product->name;

        $this->url = $this->id ."/". Inflector::slug($this->name);

        $this->content = $product->content;
        $this->thumbnail = $product->thumbnail;
        $this->shopId = $product->shopId;
        
        $this->priority = $product->priority;
        
//        for($i = 0, $l = count($product->product->types); $i < $l; $i++){
//            $this->types[] = new \App\Services\Entity\Type($product->product->types[$i]);
//        }
    }
}

?>
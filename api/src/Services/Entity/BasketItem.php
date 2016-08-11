<?php

namespace App\Services\Entity;

class BasketItem
{
    public $id = "";
    public $name = "";
    public $articleId = 0;

        
    public $description = "";
    public $quantity = 0;
    
    public $productId = 0;
    
    public $appearance = null;
    public $size = null;
    
    public $priceItem = 0;
    public $price = 0;
    
    public $pictureLink = "";
    public $link = "";
    
    public $extraElement = "";
    
    function __construct($item){
        if($item === null){
            return;
        }
        
        $this->id = (string)$item->attributes()->id;
        $this->name = "";
        $this->articleId = (int)$item->element->attributes()->id;
         
        $this->description = (string)$item->description;
        $this->quantity = (int)$item->quantity;
        
        $this->appearance = new \App\Services\Entity\Appearance();
        $this->size = new \App\Services\Entity\Size();

        foreach ($item->element->properties->property as $property){
            if((string)$property->attributes()->key === "size"){
                $this->size->shopId = (int)$property;
            } else if((string)$property->attributes()->key === "sizeLabel"){
                $this->size->name = (string)$property;
            } else if((string)$property->attributes()->key === "product"){
                $this->productId = (float)$property;
            } else if((string)$property->attributes()->key === "appearanceLabel"){
                $this->appearance->name = (string)$property;
            } else if((string)$property->attributes()->key === "appearance"){
                $this->appearance->shopId = (int)$property;
            }
        }
        
        $this->priceItem = (float)$item->priceItem->display;
        $this->price = (float)$item->price->display;

        $this->pictureLink = "http://image.spreadshirtmedia.net/image-server/v1/products/". $this->productId .",appearanceId=". $this->appearance->shopId .".jpg";
    
        foreach ($item->links->link as $link){
        
            if((string)$link->attributes()->type === "edit"){
                $this->link = (string)$link->attributes('xlink', true);
            }
        }
        $this->extraElement = $item->element->asXML();
        
    }
}

?>
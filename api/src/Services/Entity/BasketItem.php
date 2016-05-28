<?php

namespace App\Services\Entity;

class BasketItem
{
    public $id = "";
    public $name = "";
    
    public $description = "";
    public $quantity = 0;
    
    public $productId = 0;
    public $appearanceName = "";
    public $sizeName = "";
    
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
        
        $this->description = (string)$item->description;
        $this->quantity = (int)$item->quantity;
        
        $appearanceId = 0;
        foreach ($item->element->properties->property as $property){
            if((string)$property->attributes()->key === "sizeLabel"){
                $this->sizeName = (string)$property;
            } else if((string)$property->attributes()->key === "product"){
                $this->productId = (float)$property;
            } else if((string)$property->attributes()->key === "appearanceLabel"){
                $this->appearanceName = (string)$property;
            } else if((string)$property->attributes()->key === "appearance"){
                $appearanceId = (string)$property;
            }
        }
        
        $this->priceItem = (float)$item->priceItem->display;
        $this->price = (float)$item->price->display;

        $this->pictureLink = "http://image.spreadshirtmedia.net/image-server/v1/products/". $this->productId .",appearanceId=". $appearanceId .",version=1462049215.jpg";
    
        foreach ($item->links->link as $link){
        
            if((string)$link->attributes()->type === "edit"){
                $this->link = (string)$link->attributes('xlink', true);
            }
        }
        $this->extraElement = $item->element->asXML();
        
    }
}

?>
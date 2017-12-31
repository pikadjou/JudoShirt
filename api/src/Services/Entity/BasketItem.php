<?php

use Cake\Log\Log;

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
        
        $this->id = $item->id;
       // $this->name = "";
        $this->articleId = $item->articleId;
         
        //$this->description = $item->description;
        $this->quantity = $item->quantity;
        
        
        $this->appearance = new \App\Services\Entity\Appearance($item->appearance);
        $this->size = new \App\Services\Entity\Size($item->size);

        $this->priceItem = $item->priceItem;
        $this->price = $item->price;

        $this->pictureLink = $item->pictureLink;
    
        /*
        foreach ($item->links->link as $link){
        
            if((string)$link->attributes()->type === "edit"){
                $this->link = (string)$link->attributes('xlink', true);
            }
        }
        $this->extraElement = $item->element->asXML();
        */
    }
}

?>
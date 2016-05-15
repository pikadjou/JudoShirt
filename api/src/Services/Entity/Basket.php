<?php

namespace App\Services\Entity;

class Basket
{
    public $id = "";
    
    public $checkoutLink = "";
    
    public $priceItems = 0;
    public $priceShipping = 0;
    public $priceTotal = 0;
    
    public $basketItems = [];
    
    function __construct($basket){
        if($basket === null){
            return;
        }
        
        $this->id = (string)$basket->attributes()->id;
        
        if((string)$basket->getName() === 'reference'){
            return;
        }
        
        foreach ($basket->links->link as $link){
        
            if((string)$link->attributes()->type === "shopCheckout"){
                $this->checkoutLink = (string)$link->attributes('xlink', true);
            }
        }
        
        $this->priceItems = (float)$basket->priceItems->display;
        $this->priceShipping = (float)$basket->shipping->price->display;
        $this->priceTotal = (float)$basket->priceTotal->display;
        
        foreach ($basket->basketItems->basketItem as $basketItem){
            $this->basketItems[] = new BasketItem($basketItem);
        }
    }
}

?>
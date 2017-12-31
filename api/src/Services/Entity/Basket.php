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
    public $discounts = [];
    
    function __construct($basket){
        if($basket === null){
            return;
        }
        
        $this->id = $basket->id;

        foreach ($basket->items as $item){
            $this->basketItems[] = new BasketItem($item);
        }

        $this->priceItems = $basket->priceItems;
        $this->priceShipping = $basket->priceShipping;
        $this->priceTotal = $basket->priceTotal;
        /*
        if((string)$basket->getName() === 'reference'){
            return;
        }
        
        foreach ($basket->links->link as $link){
        
            if((string)$link->attributes()->type === "shopCheckout"){
                $this->checkoutLink = (string)$link->attributes('xlink', true);
            }
        }
        
        foreach ($basket->basketItems->basketItem as $basketItem){
            $this->basketItems[] = new BasketItem($basketItem);
        }
        
        if($basket->discounts->discount){
            foreach ($basket->discounts->discount as $discount){
                $this->discounts[] = new Discount($discount);
            }
        }
        */
    }
}

?>
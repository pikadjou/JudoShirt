<?php

namespace App\Services\BasketsRequestHandler;

class GetBasketResponse extends \App\Services\RHBaseResponse
{
    public $basket = null;
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($basket) {
        $this->basket = new \App\Services\Entity\Basket($basket);
    }
}

?>
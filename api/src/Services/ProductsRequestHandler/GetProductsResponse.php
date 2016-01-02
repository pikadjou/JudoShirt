<?php

namespace App\Services\ProductsRequestHandler;

class GetProductsResponse extends \App\Services\RHBaseResponse
{
    public $products = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($products) {
        for($i = 0, $l = count($products); $i < $l; $i++){
            $this->products[] = new \App\Services\Entity\Product($products[$i]);
        }
    }
}

?>
<?php

namespace App\Services\ProductsRequestHandler;

class GetProductResponse extends \App\Services\RHBaseResponse
{
    public $product = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($product) {
        $this->product = new \App\Services\Entity\Product($product);
    }
}

?>
<?php

namespace App\Services\ProductsRequestHandler;

class GetProductResponse extends \App\Services\RHBaseResponse
{
    public $product = null;
    public $articles = [];

    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($product, $articles) {
        $this->product = new \App\Services\Entity\Product($product);
        
        for($i = 0, $l = count($articles); $i < $l; $i++){
            $this->articles[] = new \App\Services\Entity\Article($articles[$i]);
        }
    }
}

?>
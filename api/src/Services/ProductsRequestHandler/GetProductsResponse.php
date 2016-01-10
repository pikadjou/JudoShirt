<?php

namespace App\Services\ProductsRequestHandler;

class GetProductsResponse extends \App\Services\RHBaseResponse
{
    public $design = [];
    public $products = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($products, $design) {
        $this->design = new \App\Services\Entity\Design($design);
        for($i = 0, $l = count($products); $i < $l; $i++){
            $this->products[] = new \App\Services\Entity\Product($products[$i]);
        }
    }
}

?>
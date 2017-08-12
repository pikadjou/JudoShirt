<?php

namespace App\Services\SearchRequestHandler;

class GetSearchListResponse extends \App\Services\RHBaseResponse
{
    public $articles = [];
    public $designs = [];
    public $products = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($designs, $articles, $products) {
        for($i = 0, $l = count($designs); $i < $l; $i++){
            $this->designs[] = new \App\Services\Entity\Design($designs[$i]);
        }
        for($i = 0, $l = count($articles); $i < $l; $i++){
            $this->articles[] = new \App\Services\Entity\Article($articles[$i]);
        }
        for($i = 0, $l = count($products); $i < $l; $i++){
            $this->products[] = new \App\Services\Entity\Product($products[$i]);
        }
    }
}

?>
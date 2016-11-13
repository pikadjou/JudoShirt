<?php

namespace App\Services\ArticlesRequestHandler;

class GetHilightResponse extends \App\Services\RHBaseResponse
{
    public $articles = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($articles) {
        for($i = 0, $l = count($articles); $i < $l; $i++){
            $this->articles[] = new \App\Services\Entity\Article($articles[$i]);
        }
    }
}

?>
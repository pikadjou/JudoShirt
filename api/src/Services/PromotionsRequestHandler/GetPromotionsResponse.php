<?php

namespace App\Services\PromotionsRequestHandler;

class GetPromotionsResponse extends \App\Services\RHBaseResponse
{
    public $promotions = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($promotions) {
        for($i = 0, $l = count($promotions); $i < $l; $i++){
            $this->promotions[] = new \App\Services\Entity\Promotion($promotions[$i]);
        }
    }
}

?>
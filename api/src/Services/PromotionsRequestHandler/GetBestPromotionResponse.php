<?php

namespace App\Services\PromotionsRequestHandler;

class GetBestPromotionResponse extends \App\Services\RHBaseResponse
{
    public $promotion = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($promotion) {
        $this->promotion = new \App\Services\Entity\Promotion($promotion);
    }
}

?>
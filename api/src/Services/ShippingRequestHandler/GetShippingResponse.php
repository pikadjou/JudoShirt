<?php

namespace App\Services\ShippingRequestHandler;

class GetShippingResponse extends \App\Services\RHBaseResponse
{
    public $countries = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($countries) {
        
        for($i = 0, $l = count($countries); $i < $l; $i++){
            $this->countries[] = new \App\Services\Entity\Country($countries[$i]);
        }
    }
}

?>
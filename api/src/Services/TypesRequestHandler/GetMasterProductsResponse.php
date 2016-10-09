<?php

namespace App\Services\TypesRequestHandler;

class GetMasterProductsResponse extends \App\Services\RHBaseResponse
{
    public $types = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($types) {
        
        for($i = 0, $l = count($types); $i < $l; $i++){
            $this->types[] = new \App\Services\Entity\type($types[$i]);
        }
    }
}

?>
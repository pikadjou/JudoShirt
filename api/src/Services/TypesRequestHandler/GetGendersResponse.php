<?php

namespace App\Services\TypesRequestHandler;

class GetGendersResponse extends \App\Services\RHBaseResponse
{
    public $types = [];

    function __construc() {
        parent::__construc();
        
    }
    
    function init ($types, $designs = null, $categories = null, $secondTypes = null) {
        
        for($i = 0, $l = count($types); $i < $l; $i++){
            $this->types[] = new \App\Services\Entity\type($types[$i]);
        }
    }
}

?>
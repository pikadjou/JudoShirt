<?php

namespace App\Services\PrintsRequestHandler;

class GetPrintsResponse extends \App\Services\RHBaseResponse
{
    public $prints = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($prints) {
        for($i = 0, $l = count($prints); $i < $l; $i++){
            $this->prints[] = new \App\Services\Entity\PrintType($prints[$i]);
        }
    }
}

?>
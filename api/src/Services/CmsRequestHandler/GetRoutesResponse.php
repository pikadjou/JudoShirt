<?php

namespace App\Services\CmsRequestHandler;

class GetRoutesResponse extends \App\Services\RHBaseResponse
{
    public $pages = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($cms) {
        for($i = 0, $l = count($cms); $i < $l; $i++){
            $this->pages[] = new \App\Services\Entity\Cms($cms[$i]);
        }
    }
}

?>
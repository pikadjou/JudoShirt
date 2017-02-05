<?php

namespace App\Services\CmsRequestHandler;

class GetRoutesResponse extends \App\Services\RHBaseResponse
{
    public $pages = [];
    public $configs = [];
    
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($cms, $configs) {
        for($i = 0, $l = count($cms); $i < $l; $i++){
            $this->pages[] = new \App\Services\Entity\Cms($cms[$i]);
        }
        for($i = 0, $l = count($configs); $i < $l; $i++){
            $this->configs[] = new \App\Services\Entity\Config($configs[$i]);
        }
    }
}

?>
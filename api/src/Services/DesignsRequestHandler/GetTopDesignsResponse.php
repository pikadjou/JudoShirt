<?php

namespace App\Services\DesignsRequestHandler;

class GetTopDesignsResponse extends \App\Services\RHBaseResponse
{
    public $designs = [];
    public $category = null;
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($designs, $category) {
        if($category !== null){
            $this->category = new \App\Services\Entity\Category($category);    
        }
        for($i = 0, $l = count($designs); $i < $l; $i++){
            $this->designs[] = new \App\Services\Entity\Design($designs[$i]);
        };
    }
}

?>
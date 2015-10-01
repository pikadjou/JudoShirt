<?php

namespace App\Services\CategoriesRequestHandler;

class GetCategoriesResponse extends \App\Services\RHBaseResponse
{
    public $categories = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($categories) {
        for($i = 0, $l = count($categories); $i < $l; $i++){
            $this->categories[] = new \App\Services\Entity\Category($categories[$i]);
        };
    }
}

?>
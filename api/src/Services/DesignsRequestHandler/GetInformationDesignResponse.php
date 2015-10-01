<?php

namespace App\Services\DesignsRequestHandler;

class GetInformationDesignResponse extends \App\Services\RHBaseResponse
{
    public $design = null;
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($design) {
        $this->design = new \App\Services\Entity\Design($design);
    }
}

?>
<?php

namespace App\Services\UsersRequestHandler;

class GetLoginMethodesResponse extends \App\Services\RHBaseResponse
{
    public $methodesList = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init () {

    }
    
    function add($methode){
        $this->methodesList[] = $methode;
    }
}

?>
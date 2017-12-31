<?php

namespace App\Services\UsersRequestHandler;

class GetRecoveryResponse extends \App\Services\RHBaseResponse
{
    public $success = false;
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($success) {
        $this->success = $success;
    }
}

?>
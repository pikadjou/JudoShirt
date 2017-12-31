<?php

namespace App\Services\UsersRequestHandler;

class GetCreateResponse extends \App\Services\RHBaseResponse
{
    public $success = false;
    public $user = null;
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($success) {
        $this->success = $success;
    }
    
    function addUser($user){
        $this->user = $user;  
    }
}

?>
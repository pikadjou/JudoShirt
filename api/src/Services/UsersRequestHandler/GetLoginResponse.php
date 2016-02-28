<?php

namespace App\Services\UsersRequestHandler;

class GetLoginResponse extends \App\Services\RHBaseResponse
{
    public $success = false;
    public $cookie = null;
    public $user = null;
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($success) {
        $this->success = $success;
    }
    function addCookie ($name, $value) {
        $this->cookie = new \App\Services\Entity\Cookie($name, $value, 0);
    }
    function addUser($user){
        $this->user = $user;  
    }
}

?>
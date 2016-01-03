<?php

namespace App\Services\HelpRequestHandler;

class SendContactResponse extends \App\Services\RHBaseRequest
{
    public $code = 0;
    public $message = "";
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($code, $message) {
        $this->code = $code;
        $this->message = $message;

    }
}

?>
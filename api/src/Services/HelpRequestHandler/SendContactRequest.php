<?php

namespace App\Services\HelpRequestHandler;

class SendContactRequest extends \App\Services\RHBaseRequest
{
    public $name = "";
    public $nickname = "";
    public $mail = "";
    public $message = "";
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($request) {
        $this->name = $request["name"];
        $this->nickname = $request["nickname"];
        $this->mail = $request["mail"];
        $this->message = $request["message"];

    }
}

?>
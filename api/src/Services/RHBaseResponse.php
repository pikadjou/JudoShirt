<?php

namespace App\Services;

class RHBaseResponse
{
    public $Identifier = "";
    public $errorMessage = "";
    function __construct(){
        /*$classe = get_class($this);
        $explode = explode("\\", $classe);
        
        $name = $explode[count($explode) - 1];
        
        $this->set('Identifier', $name);
         * */
         
    }

    function initError($message){
        $this->errorMessage = $message;
    }
}

?>
<?php

namespace App\Services;

class RHBaseResponse
{
    public $name = "";
    
    function __construct(){
        $this->name = get_class($this);
    }
}

?>
<?php

namespace App\Services\Entity;

class LoginMethode
{
    public $name = "";
    public $link = "";
    public $type = "";
    public $data = "";
    
    function __construct($name, $link, $type, $data){
        
        $this->name = $name;
        $this->link = $link;
        $this->type = $type;

        $this->data = $data;
    }
}

?>
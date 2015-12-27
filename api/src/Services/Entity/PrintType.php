<?php

namespace App\Services\Entity;

class PrintType
{
    public $id = 0;
    public $name = "";
    public $content = "";
        
    function __construct($print){

        $this->id = $print->id;
        $this->name = $print->name;
        $this->content = $print->content;
        
    }
}

?>
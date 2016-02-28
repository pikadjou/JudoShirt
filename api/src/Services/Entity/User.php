<?php

namespace App\Services\Entity;

class User
{
    public $name = "";
    public $memberSince = "";
    
    function __construct($name ="", $memberSince=""){
        
        $this->name = $name;
        $this->memberSince = $memberSince;
        
    }
    
    function initByXml($xml){
        $this->name = (string)$xml->name;
        $this->memberSince = (string)$xml->memberSince;
    }
}

?>
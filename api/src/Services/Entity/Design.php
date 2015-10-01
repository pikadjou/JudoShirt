<?php

namespace App\Services\Entity;

class Design
{
    public $id = 0;
    public $name = "";
    public $content = "";
    public $thumbnail = "";
    public $header = "";
    public $idShop = 0;
    public $idCustomShop = 0;
    
    public $categories = [];
    public $tags = [];
    
    function __construct($design){
        $this->id = $design->id;
        $this->name = $design->name;
        $this->content = $design->content;
        $this->thumbnail = $design->thumbnail;
        $this->header = $design->header;
        $this->idShop = $design->idShop;
        $this->idCustomShop = $design->idCustomShop;
        
        for($i = 0, $l = count($design->categories); $i < $l; $i++){
            $this->categories[] = new \App\Services\Entity\Category($design->categories[$i]);
        };
        
        for($i = 0, $l = count($design->tags); $i < $l; $i++){
            $this->tags[] = new \App\Services\Entity\Tag($design->tags[$i]);
        };
    }
}

?>
<?php

namespace App\Services\Entity;

use Cake\Utility\Inflector;

class Design
{
    public $id = "";
    public $name = "";
    public $url = "";
    public $content = "";
    public $thumbnail = "";
    public $header = "";
    public $shopId = 0;
    public $idCustomShop = 0;
    
    public $categories = [];
    public $tags = [];
    
    function __construct($design){
        
        $this->id = $design->id; //."-".Inflector::slug($design->name);
        $this->name = $design->name;
        
        $this->url = $this->id ."/". Inflector::slug($this->name);
        
        $this->content = $design->content;
        $this->thumbnail = $design->thumbnail;
        $this->header = $design->header;
        $this->shopId = $design->shopId;
        $this->idCustomShop = $design->idCustomShop;
        
        for($i = 0, $l = count($design->categories); $i < $l; $i++){
            $this->categories[] = new \App\Services\Entity\Category($design->categories[$i]);
        }
        
        for($i = 0, $l = count($design->tags); $i < $l; $i++){
            $this->tags[] = new \App\Services\Entity\Tag($design->tags[$i]);
        }
    }
}

?>
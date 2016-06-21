<?php

namespace App\Services\Entity;

class Article
{
    public $id = 0;
    public $name = "";
    public $content = "";
    public $price = "";
    public $thumbnail = "";
    public $shopId = 0;
    public $idCustomShop = 0;
    public $priority = 0;
    
    public $types = [];
    public $design = null;
    
    function __construct($article){
        if($article === null){
            return;
        }
        
        $this->id = $article->id;
        $this->name = $article->name;
        if(!$this->name){
            $this->name = $article->product->name;
        }
        $this->content = $article->content;
        $this->price = $article->price;
        $this->thumbnail = $article->thumbnail;
        $this->shopId = $article->shopId;
        $this->idCustomShop = $article->idCustomShop;
        
        $this->priority = $article->priority;
        if(!$this->priority || $this->priority === 0){
            $this->priority = $article->product->priority;
        }
        
        for($i = 0, $l = count($article->product->types); $i < $l; $i++){
            $this->types[] = new \App\Services\Entity\Type($article->product->types[$i]);
        }
        
        if($article->design){
             $this->design = new \App\Services\Entity\Design($article->design);
        }
    }
}

?>
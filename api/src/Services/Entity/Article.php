<?php

namespace App\Services\Entity;

use Cake\Utility\Inflector;

use Cake\Log\Log;

class Article
{
    public $id = 0;
    public $name = "";
    public $url = "";
        
    public $short = "";
    public $content = "";
    public $price = "";
    
    public $thumbnail = "";
    public $sizeThumbnail = "";

    public $extra = "";
    public $shopId = 0;
    public $idCustomShop = 0;
    public $priority = 0;
    
    public $types = [];
    
    public $sizes = [];
    public $measures = [];
    public $appearances = [];
    public $views = [];
    
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
        
        $this->url = $this->id ."/". Inflector::slug($article->slug);

        /*$this->short = $article->product->short;*/
        $this->content = $article->content;
        if(!$this->content){
            $this->content = $article->product->content;
        }
        
        $this->price = $article->price;
        
        $this->thumbnail = $article->thumbnail;
        
       /* $this->sizeThumbnail = $article->product->sizeThumbnail;*/

       /* $this->extra = $article->extra;*/

        //$this->shopId = $article->shopId;
        //$this->idCustomShop = $article->idCustomShop;
        
        /*$this->priority = $article->priority;
        if(!$this->priority || $this->priority === 0){
            $this->priority = $article->product->priority;
        }*/
        
       /* for($i = 0, $l = count($article->product->types); $i < $l; $i++){
            $this->types[] = new \App\Services\Entity\Type($article->product->types[$i]);
        }*/
        /*for($i = 0, $l = count($article->product->measures); $i < $l; $i++){
            $this->measures[] = new \App\Services\Entity\Measure($article->product->measures[$i]);
        }*/
         
        for($i = 0, $l = count($article->sizes); $i < $l; $i++){
            $this->sizes[] = new \App\Services\Entity\Size($article->sizes[$i]);
        }
    /*debug($article->product);
        for($i = 0, $l = count($article->product->appearances); $i < $l; $i++){
            $this->appearances[] = new \App\Services\Entity\Appearance($article->product->appearances[$i]);
        }
        for($i = 0, $l = count($article->product->views); $i < $l; $i++){
            $this->views[] = new \App\Services\Entity\View($article->product->views[$i]);
        }
        
        if($article->design){
             $this->design = new \App\Services\Entity\Design($article->design);
        }*/
    }
}

?>
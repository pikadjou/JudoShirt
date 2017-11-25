<?php

namespace App\Services\ArticlesRequestHandler;

class GetArticlesByDesignResponse extends \App\Services\RHBaseResponse
{
    public $design = [];
    public $articles = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($articles, $design = null) {
        for($i = 0, $l = count($articles); $i < $l; $i++){
            $this->articles[] = new \App\Services\Entity\Article($articles[$i]);
        }

        if($design)
            $this->design = new \App\Services\Entity\Design($design);
    }
}

?>
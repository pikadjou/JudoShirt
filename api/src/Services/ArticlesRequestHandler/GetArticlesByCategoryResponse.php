<?php

namespace App\Services\ArticlesRequestHandler;

class GetArticlesByCategoryResponse extends \App\Services\RHBaseResponse
{
    public $articles = [];
    public $category = null;
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($articles, $category) {
        for($i = 0, $l = count($articles); $i < $l; $i++){
            $this->articles[] = new \App\Services\Entity\Article($articles[$i]);
        }

        $this->category = new \App\Services\Entity\Category($category);
    }
}

?>
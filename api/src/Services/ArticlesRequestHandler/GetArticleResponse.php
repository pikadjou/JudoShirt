<?php

namespace App\Services\ArticlesRequestHandler;

class GetArticleResponse extends \App\Services\RHBaseResponse
{
    public $article = [];
    
    function __construc() {
        parent::__construc();
        
    }
    
    function init ($article) {
        $this->article = new \App\Services\Entity\Product($article);
    }
}

?>
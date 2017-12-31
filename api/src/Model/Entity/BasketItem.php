<?php
namespace App\Model\Entity;

/**
 * Tag Entity.
 */
class BasketItem
{
    public $id = "";
    public $name = "";
    public $articleId = 0;
    public $variationId = 0;
    public $sizeId = "";
    public $appearanceId = "";
    
        
    public $description = "";
    public $quantity = 1;
    
    public $appearance = null;
    public $size = null;
    
    public $priceItem = 0;
    public $price = 0;
    
    public $pictureLink = "";
    //public $link = "";
    
    //public $extraElement = "";

    public function initByArticle($article){
        $this->articleId = $article['id'];
        $this->appearanceId = $article['appearances'][0]['id'];
        $this->sizeId = $article['sizes'][0]['id'];
        $this->variationId = $article['variations'][0]['id'];      
    }
}

<?php
namespace App\Model\Entity;

use Cake\ORM\TableRegistry;

/**
 * Tag Entity.
 */
class OrderItem extends AppEntity
{
    public $id;
    public $name;
    public $thumbnail;

    public $quantity;
    public $price;

    public $discount;
    public $subtotal;
    public $total;

    public $articleId = 0;
    public $variationId = 0;
    public $sizeId = "";
    public $appearanceId = "";

    public function set($entity){
        parent::set($entity);

        $this->discount = $this->subtotal - $this->total;
        $article = TableRegistry::get('Articles')->getVariation($entity->product_id, $entity->variation_id);

        $variation = null;
        if(count($article->variations) > 0){
            $variation = $article->variations[0];    
        }
        
        if($article){
            $this->name = $article->name;
            $this->thumbnail = $article->thumbnail;

            $this->articleId = $article->id;

            if($variation !== null){
                $this->variationId = $variation->id;
                $this->sizeId = $variation->sizeId;
                $this->size = $variation->size;
                $this->appearanceId = $variation->appearanceId;
                $this->appearance = $variation->appearance;
            }
        }

        return $this;
    }

    public function initByArticle($article){
        $this->articleId = $article['id'];
        $this->appearanceId = $article['appearances'][0]['id'];
        $this->sizeId = $article['sizes'][0]['id'];
        $this->variationId = $article['variations'][0]['id'];      
    }
}

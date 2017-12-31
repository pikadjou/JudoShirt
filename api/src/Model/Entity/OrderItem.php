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

    public $total;

    public function set($entity){
        parent::set($entity);

        $article = TableRegistry::get('Articles')->getVariation($entity->product_id, $entity->variation_id);

        if($article){
            $this->name = $article->name;
            $this->thumbnail = $article->thumbnail;
        }

        return $this;
    }
}

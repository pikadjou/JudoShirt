<?php
namespace App\Model\Table;

use App\Model\Entity\Basket;
use App\Model\Entity\BasketItem;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

use Cake\ORM\TableRegistry;

/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
class BasketsTable extends Table
{
    
    protected $_articlesModel = null;

    public function initialize(array $config)
    {
        $this->entityClass('App\Model\Entity\BasketRecovery');

        $this->_articlesModel = TableRegistry::get('Articles');
    }

    public function getOneOrCreate($data){

        $clientsTable = TableRegistry::get('Clients');
        $user = $clientsTable->GetActiveUser($data['token']);

        if($data['id'] === null){
            $basket = $this->_create(property_exists($client, 'id') ? $client->id : null);
        }else{
            $basket = $this->_getOne($data['id']);
            
            if($basket === null){
              $basket = $this->_create(property_exists($client, 'id') ? $client->id : null);
            }
        }
        $basket = $this->_fill($basket);
        return $basket;
    }
    public function addArticle($basket, $article){
        
        $item = new BasketItem();
        $item->initByArticle($article);

        $item = $this->_fillItem($item);
      
        $basket->items[] = $item;
        
        $basket = $this->_fillPrice($basket);

        $this->_save($basket);
        return $basket;
    }
    public function deleteArticle($basket, $id){
        return $this->_removeArticle($basket, $id);
    }

    public function updateArticleQuantity($basket, $id, $quantity){
        
        return $this->_updateArticle($basket, $id, $quantity);
    }

// private methode
    private function _create($clientId){
        $basketRecovery = $this->_getOneByClientId($clientId);

        if($basketRecovery !== null){
            return $basketRecovery;
        }
        $basketRecovery = $this->newEntity();
        $basketRecovery->client_id = $clientId;
        $basketRecovery->content = json_encode(new Basket());

        if ( $this->save($basketRecovery)) {
            return $basketRecovery;
        }
        return $basketRecovery;
    }
    private function _save($basket){
        $basketRecovery = $this->_getOne($basket->id);
        $basketRecovery->content = json_encode($basket);

        $this->save($basketRecovery);

    }
    private function _getOne($id){
        $basket = $this->find()->where(["id" => $id])->first();
        return $basket;
    }
    private function _getOneByClientId($id){
        if($id === null){
            return null;
        }
        $basket = $this->find()->where(["client_id" => $id])->first();
        return $basket;
    }
    private function _fill($basketRecovery){
        $basket = json_decode($basketRecovery->content);
        $basket->id = $basketRecovery->id;

        foreach($basket->items as $item){
            $item = $this->_fillItem($item);
        }
        $basket = $this->_fillPrice($basket);

        $this->_save($basket);

        return $basket;
    }
    private function _fillItem($item){

        $article = $this->_articlesModel->getVariation($item->articleId, $item->variationId);

        $variation = $article->variations[0];
        $item->id = $variation->id;
        $item->priceItem = (float)$variation->price;
        $item->price = $item->priceItem * $item->quantity;
        $item->pictureLink = $variation->image;
        $item->size = $variation->size;
        $item->appearance = $variation->appearance;
        
        
        return $item;
    }
    private function _fillPrice($basket){

        $total = 0;
        foreach($basket->items as $item){
            $total += $item->price;
        }
        $basket->priceItems = $total;
        $basket->priceShipping = 10;
        $basket->priceTotal = $basket->priceItems + $basket->priceShipping;
        return $basket;
    }
    private function _removeArticle($basket, $id){
        foreach($basket->items as $k => $item){
            if($item->id === $id){
                array_splice($basket->items, $k, 1);
            }
        }

        $basket = $this->_fillPrice($basket);
        
        $this->_save($basket);

        return $basket;
    }
    private function _updateArticle($basket, $id, $quantity){
        foreach($basket->items as $k => $item){
            if($item->id === $id){
                $item->quantity = $quantity;
                $item = $this->_fillItem($item);
                break;
            }
        }
        $basket = $this->_fillPrice($basket);
        $this->_save($basket);

        return $basket;
    }
}

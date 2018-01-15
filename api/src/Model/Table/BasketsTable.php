<?php
namespace App\Model\Table;

use App\Model\Entity\OrderItem;

use Cake\ORM\TableRegistry;

/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
class BasketsTable extends AppTable
{
    protected $_articlesModel = null;

    public function initialize(array $config)
    {
        $this->_articlesModel = TableRegistry::get('Articles');
    }
    public function link($id, $clientId){
        return $this->_link($id, $clientId);
    }

    public function getOne($id){

        $basket = $this->_getOne($id);

        return $basket;
    }
    public function getOneOrCreate($client){

        $id = ($client !== null) ? $client->id : null;
        $basket = null;

        if($id !== null){
            $basket = $this->_getOneByClientId($id);
        }
            
        if($basket === null){
            $basket = $this->_create($id);
        }
        
        return $basket;
    }
    public function addArticle($basketId, $article){
        
        $basket = $this->_addArticle($basketId, $article);

        return $basket;
    }
    public function deleteArticle($basketId, $id){
        return $this->_updateArticle($basketId, $id, 0);
    }

    public function updateArticleQuantity($basketId, $id, $quantity){
        return $this->_updateArticle($basketId, $id, $quantity);
    }
    public function addCoupon($basketId, $couponCode){
        return $this->_addCoupon($basketId, $couponCode);
    }

// private methode
    private function _create($clientId){
        
        $data = [];
        if($clientId){
            $data["customer_id"] = $clientId;
        }

        return $this->_save($data);
    }
    private function _save($basket){
        $basket = TableRegistry::get('Orders')->createBasket($data);
        return $basket;
    }
    protected function _update($basket){
        $basket = TableRegistry::get('Orders')->updateBasket($basket->id, $basket);
        return $basket;
    }
    private function _getOne($id){
        if($id === null){
            return null;
        }
        $basket = TableRegistry::get('Orders')->getBasketById($id);
        return $basket;
    }
    private function _getOneByClientId($id){
        if($id === null){
            return null;
        }
        $basket = TableRegistry::get('Orders')->getBasketByClientId($id);
        return $basket;
    }
    private function _link($id, $clientId){
        $basket = $this->getOne($id);

        $basket->clientId = $clientId;

        $basket = $this->_update($basket);
        return $basket;
    }
    private function _addArticle($basketId, $article){

        $item = new OrderItem();
        $item->initByArticle($article);

        $basket = $this->getOne($basketId);
        $basket->items[] = $item;
        
        $basket = $this->_update($basket);

        return $basket;
    }
    private function _removeArticle($basketId, $id){
        $basket = $this->getOne($basketId);
        foreach($basket->items as $k => $item){
            if($item->id === $id){
                array_splice($basket->items, $k, 1);
            }
        }

        $basket = $this->_update($basket);
        return $basket;
    }
    private function _updateArticle($basketId, $id, $quantity){

        $basket = $this->getOne($basketId);
        foreach($basket->items as $k => $item){
            if($item->id === $id){
                $item->quantity = $quantity;
                break;
            }
        }
        $basket = $this->_update($basket);

        return $basket;
    }

    private function _addCoupon($id, $couponCode){
        $basket = $this->getOne($id);

        $basket->addCoupon($couponCode);
        
        $basket = $this->_update($basket);
        return $basket;
    }
}

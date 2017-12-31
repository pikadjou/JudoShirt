<?php
namespace App\Model\Table;

use App\Model\Entity\Order;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

use Cake\Log\Log;
use Cake\Core\Configure;

use App\Model\WooCommerce;


class OrdersTable extends AppTable
{
    public function getNewModel()
    {
        return new Order();
    }
    public function all(){
        
        $orders = $this->_findAndMap();
        
        return $orders;
    }
    public function getOne($id){

    }
    public function findByClientId($clientId){
        
        $orders = $this->_findByClientIds($clientId);

        return $orders;
    }


//private methode
    private function _findById($id){
        $articles = $this->_findAndMap();

        foreach($articles as $article){
            if($article->id === $id){
                return $article;
            }
        }
        return null;
    }
    private function _findByClientIds($clientId){
        
        $orders = $this->_findAndMap();

        $filtersCollection = [];
        foreach($orders as $order){
            if(!$order->clientId){
                continue;
            }
            if($order->clientId !== $clientId){
                continue;
            }
            $filtersCollection[] = $order;
        }
        return $filtersCollection;
    }
    
    private function _find($options = []){
        if(array_key_exists("per_page", $options) === false){
            //$options["per_page"] = 500;
        }
        $woo = WooCommerce\WooCommerce::getInstance();
        $woo->get("orders", $options);
        return json_decode($woo->http->getResponse()->getBody());
    }
    private function _findAndMap($option = []){
        $orders = $this->_find($option);
        return $this->_formatArray($orders);
    }
    
}

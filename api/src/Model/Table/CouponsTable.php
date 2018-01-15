<?php
namespace App\Model\Table;

use App\Model\Entity\Coupon;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

use Cake\Log\Log;
use Cake\Core\Configure;

use App\Model\WooCommerce;


class CouponsTable extends AppTable
{
    public function getNewModel()
    {
        return new Coupon();
    }
    public function all(){
        
        $orders = $this->_findAndMap();
        
        return $orders;
    }
    
//private methode
    private function _find($options = []){
        if(array_key_exists("per_page", $options) === false){
            //$options["per_page"] = 500;
        }
        $woo = WooCommerce\WooCommerce::getInstance();
        $woo->get("coupons", $options);
        return json_decode($woo->http->getResponse()->getBody());
    }
    protected function _findAndMap($option = []){
        $orders = $this->_find($option);
        debug($orders);
        return $this->_formatArray($orders);
    }
    
}

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
    public function createBasket($data){

        $data["status"] = "pending";

        $data =  $this->_create($data);
        return $this->_format($data);
    }
    public function updateBasket($id, $data){
        $data = $this->_update($id, $data);
        return $this->_format($data);
    }
    public function getBasketByClientId($id){
        $orders = $this->findByClientId($id);

        foreach($orders as $order){
            if($order->status === "pending"){
                return $order;
            }
        }
        return null;
    }
    public function getBasketById($id){
        $order = $this->getOne($id);

        if($order === null){
            return null;
        }
        if($order->status === "pending"){
            return $order;
        }
        return null;
    }
    public function all(){
        
        $orders = $this->_findAndMap();
        return $orders;
    }
    public function getOne($id){

        $id = (int)$id;
        $orders = $this->_findAndMap();

        foreach($orders as $order){
            if($order->id === $id){
                return $order;
            }
        }
        return null;
    }

    public function findByClientId($clientId){
        $orders = $this->_findByClientId($clientId);
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
    private function _findByClientId($clientId){
        
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
    
    protected function _find($options = []){
        if(array_key_exists("per_page", $options) === false){
            //$options["per_page"] = 500;
        }
        $woo = WooCommerce\WooCommerce::getInstance();
        $woo->get("orders", $options);
        return json_decode($woo->http->getResponse()->getBody());
    }
    protected function _create($data){
        $woo = WooCommerce\WooCommerce::getInstance();
        $woo->post("orders", $data);
        return json_decode($woo->http->getResponse()->getBody());
    }
    protected function _update($id, $order){
        $woo = WooCommerce\WooCommerce::getInstance();
        $woo->put("orders/$id", $this->_mapForWoo($order));
        return json_decode($woo->http->getResponse()->getBody());
    }

    private function _mapForWoo($order){
        $data = [];

        $data["customer_id"] = 0;
        if($order->clientId){
            $data["customer_id"] = $order->clientId;
        }

        $data["line_items"] = [];
        if($order->items){
            foreach($order->items as $item){
                $itemData = [];

                $itemData["id"] = $item->id;
                $itemData["product_id"] = $item->articleId;
                $itemData["variation_id"] = $item->variationId;
                $itemData["quantity"] = $item->quantity;

                $data["line_items"][] = $itemData;
            }
        }

        /*$data["coupon_lines"] = [];
        if($order->coupons){
            foreach($order->coupons as $coupon){
                $itemData = [];
                $itemData["code"] = $coupon->code;
                $itemData["discount"] = "15.00";
                $itemData["discount_tax"] = "0.75";          

                $itemData['meta_data'] = [
                            [
                                'key' => 'coupon_data',
                                'value' => [
                                    "id" => 290,
                                    "code" => 'promo',
                                    "amount" => '15.00',
                                    "date_created" => '2018-01-01T15:48:12',
                                    "date_created_gmt" => '2018-01-01T15:48:12',
                                    "date_modified" => '2018-01-01T20:49:33',
                                    "date_modified_gmt" => '2018-01-01T20:49:33',
                                    "discount_type" => 'fixed_cart',
                                    "description" => '',
                                    "date_expires" => null,
                                    "date_expires_gmt" => null,
                                    "usage_count" => 0,
                                    "individual_use" => false,
                                    "product_ids" => [],
                                    "excluded_product_ids" => [],
                                    "usage_limit" => null,
                                    "usage_limit_per_user" => null,
                                    "limit_usage_to_x_items" => null,
                                    "free_shipping" => false,
                                    "product_categories" => [],
                                    "excluded_product_categories" => [],
                                    "exclude_sale_items" => false,
                                    "minimum_amount" => '10.00',
                                    "maximum_amount" => '1000.00',
                                    "email_restrictions" => [],
                                    "used_by" => [
                                        'pikadjou@gmail.com',
                                        'pikadjou@gmail.com'
                                    ]
                                ]
                            ]
                        ];
                $data["coupon_lines"][] = $itemData;
            }
        }*/

        debug($data);
       // die();
        return $data;
    }
    
}

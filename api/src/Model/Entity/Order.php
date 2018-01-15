<?php
namespace App\Model\Entity;

/**
 * Tag Entity.
 */
class Order extends AppEntity
{
    public $id;
    public $clientId;
    public $status;
    public $items = [];
    public $billing;
    public $shipping;
    public $coupons = [];

    function __construct() {
        parent::__construct();
        
        $this->billing = new Address();
        $this->shipping = new Address();
    }
    public function set($entity){
        parent::set($entity);

        $this->clientId = $entity->customer_id;

        foreach($entity->line_items as $article){
            $item = new OrderItem();
            $this->items[] = $item->set($article);
        }
        foreach($entity->coupon_lines as $coupon){
            $item = new Coupon();
            $this->coupons[] = $item->set($coupon);
        }

        return $this;
    }

    public function addCoupon($code){
        $coupon = new Coupon();
        $coupon->code = $code;

        $this->coupons[] = $coupon;
    }
}

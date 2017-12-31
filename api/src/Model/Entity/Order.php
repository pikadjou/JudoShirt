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


        return $this;
    }
}

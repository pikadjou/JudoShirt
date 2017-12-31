<?php
namespace App\Model\Entity;

/**
 * Tag Entity.
 */
class Client extends AppEntity
{
    public $id = 0;
    public $token = "";
    public $name = "";
    
    public $billing;
    public $shipping;

    function __construct() {
        parent::__construct();
        
        $this->billing = new Address();
        $this->shipping = new Address();
    }

    public function set($entity, $token = ""){
        parent::set($entity);

        $this->token = $token;

        return $this;
    }
}

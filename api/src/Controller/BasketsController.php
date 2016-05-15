<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\BasketsRequestHandler;

class BasketsController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }
   
    public function getBasket($id = null, $token = null){
        
        if($id === "null"){
            $id = null;
        }
        if($token === "null" || $token === ""){
            $token = null;
        }
        $basket = null;
        if($id === null){
            // creation du basket
            $basket = $this->Baskets->create($token);
        }else{
            //recuperation du basket
            $basket = $this->Baskets->getOne($id);
            
            if($basket === null){
              $basket = $this->Baskets->create($token);
            }
        }
        
        $explode = explode("\r\n\r\n", $basket, 2);
        $basket = end($explode);
        $basket = simplexml_load_string($basket);

        //traitement du basket
        $response = new BasketsRequestHandler\GetBasketResponse();
        $response->init($basket);

        parent::setJson($response);
    }
}

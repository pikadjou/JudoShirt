<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\BasketsRequestHandler;
use App\Services\HelpRequestHandler;

use Cake\Log\Log;

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
    
    public function updateQuantity(){
        $data = $this->request->data;

        if($data){
            $basketId = $data['basketId'];
            $id = $data['id'];
            $quantity = $data['quantity'];
            $element = $data['element'];

            if($quantity === 0){
                $ok = $this->Baskets->deleteArticle($basketId, $id);
            }else{
                $ok = $this->Baskets->updateArticleQuantity($basketId, $id, $quantity, $element);
            }
            

            $basket = $this->Baskets->getOne($basketId);
            $explode = explode("\r\n\r\n", $basket, 2);
            $basket = end($explode);
            $basket = simplexml_load_string($basket);

            //traitement du basket
            $response = new BasketsRequestHandler\GetBasketResponse();
            $response->init($basket);

            parent::setJson($response);
        }else{
            
            $response = new HelpRequestHandler\SendContactResponse();
            $response->init(0, "test");

            parent::setJson($response);
        }
        
    }
    
    public function addArticle(){
        $data = $this->request->data;

        if($data){
            $article = $data['article'];
            $basketId = $data['basketId'];
                    
            $basket = $this->Baskets->getOne($basketId);
            $explode = explode("\r\n\r\n", $basket, 2);
            $basket = end($explode);
            $basket = simplexml_load_string($basket);

            $basketId = (string)$basket->attributes()->id;
            
            $ok = $this->Baskets->addArticle($basketId, $article);
            
            
            //traitement du basket
            $basket = $this->Baskets->getOne($basketId);
            $explode = explode("\r\n\r\n", $basket, 2);
            $basket = end($explode);
            $basket = simplexml_load_string($basket);
            
            $response = new BasketsRequestHandler\GetBasketResponse();
            $response->init($basket);

            parent::setJson($response);
        }else{
            
            $response = new HelpRequestHandler\SendContactResponse();
            $response->init(0, "test");

            parent::setJson($response);
        }
        
    }
}

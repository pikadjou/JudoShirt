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
   
    public function getBasket(){
        
        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;
        $basket = $this->Baskets->getOneOrCreate($data);
        
        //traitement du basket
        $response = new BasketsRequestHandler\GetBasketResponse();
        $response->init($basket);

        parent::setJson($response);
    }
    
    public function updateQuantity(){

        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;

        if($data){
            $basketId = $data['basketId'];
            $id = $data['id'];
            $quantity = $data['quantity'];

            $basketId = ['id' => $data['basketId'], "token" => $data['token']];
 
            $basket = $this->Baskets->getOneOrCreate($basketId);

            if($quantity === 0){
                $basket = $this->Baskets->deleteArticle($basket, $id);
            }else{
                $basket = $this->Baskets->updateArticleQuantity($basket, $id, $quantity);
            }
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

        if ($this->request->is('options')) {
            return $this->response;
        }

        $data = $this->request->data;
        if($data){
            $article = $data['article'];
            $basketId = ['id' => $data['basketId'], "token" => $data['token']];
        

            $basket = $this->Baskets->getOneOrCreate($basketId);
            $basket = $this->Baskets->addArticle($basket, $article);
            
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

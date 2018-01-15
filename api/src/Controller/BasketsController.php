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
   
    public function linkUser($id, $token){

        $this->loadModel("Clients");
        $client = $this->Clients->GetActiveUser($token);

        $basket = $this->Baskets->link($id, $client->id);

        debug($basket);
        die();        
    }
    public function getBasket($id){
        
        $basket = $this->Baskets->getOne($id);
        
        debug($basket);
        die();

        //traitement du basket
        $response = new BasketsRequestHandler\GetBasketResponse();
        $response->init($basket);

        parent::setJson($response);
    }

    public function createBasket(){
        
        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;

        if(array_key_exists ('token', $data) && $data['token'] !== ''){
            $this->loadModel("Clients");
            $client = $this->Clients->GetActiveUser($data['token']);
        }else{
            $client = null;
        }
        
        $basket = $this->Baskets->getOneOrCreate(null, $client);
        
        debug($basket);
        die();
        //traitement du basket
        $response = new BasketsRequestHandler\GetBasketResponse();
        $response->init($basket);

        parent::setJson($response);
    }
    
    public function deleteItem(){

        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;

        if($data){
            $basketId = $data['basketId'];
            $id = $data['id'];

            $basket = $this->Baskets->updateArticleQuantity($basketId, $id, 0);

            debug($basket);
            die();
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
    public function updateQuantity(){

        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;

        if($data){
            $basketId = $data['basketId'];
            $id = $data['id'];
            $quantity = $data['quantity'];

            $basket = $this->Baskets->updateArticleQuantity($basketId, $id, $quantity);

            debug($basket);
            die();
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
            $id = $data['basketId'];
            $article = $data['article'];
        
            $basket = $this->Baskets->addArticle($id, $article);
            
            debug($basket);
            die();
            $response = new BasketsRequestHandler\GetBasketResponse();
            $response->init($basket);

            parent::setJson($response);
        }else{
            
            $response = new HelpRequestHandler\SendContactResponse();
            $response->init(0, "test");

            parent::setJson($response);
        }
    }

    public function addCoupon($basketId, $couponCode){

        $basket = $this->Baskets->addCoupon($basketId, $couponCode);
        
        debug($basket);
        die();
        $response = new BasketsRequestHandler\GetBasketResponse();
        $response->init($basket);

        parent::setJson($response);
        
    }
}

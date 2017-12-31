<?php
namespace App\Controller;

use App\Error\Client;

use App\Controller\AppController;
use App\Services\UsersRequestHandler;
use App\Services\Entity;

require_once(ROOT . DS . 'vendor' . DS  . 'SpreadShirt' . DS . 'HttpRequest.php');
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class UsersController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');        
    }

    public function login(){
        
        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;
        
        $this->loadModel("Clients");

        $client = $this->Clients->GetUserByCredential($data['username'], $data['password']);
          
        $response = new UsersRequestHandler\GetLoginResponse();
        if(is_string ($client)){
            $response->init(false);   
            $response->addCookie("erreur", $client);         
        }else{
            $response->init(true);
            $response->addCookie("jwt_token", $client->token);
            $response->addUser($client);
        }
        
        parent::setJson($response);
    }
    
    public function session($id){
        
        $this->loadModel("Clients");
        $client = $this->Clients->GetActiveUser($id);
        
        $response = new UsersRequestHandler\GetSessionResponse();
        if($client == false){
            $response->init(false);
        }else{
            $response->init(true);
            
            $response->addUser($client);
            //continue traitement
        }

        parent::setJson($response);
    }
    
    public function create(){
        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;
        $this->loadModel("Clients");
        
        $response = new UsersRequestHandler\GetCreateResponse();
        try{
            $user = $this->Clients->CreateUser($data);
            $response->init(true);
            $response->addUser($user);
        }catch (\Exception $e) {
            $response->init(true);
            $response->initError($e->getMessage());         
        }
        
        parent::setJson($response);
    }
    public function recovery(){
        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;
        $this->loadModel("Clients");
        
        $response = new UsersRequestHandler\GetRecoveryResponse();
        try{
            $this->Clients->RecoveryPassword($data["username"]);
            $response->init(true);
        }catch (\Exception $e) {
            $response->init(true);
            $response->initError($e->getMessage());         
        }
        
        parent::setJson($response);
    }

    public function getInfo($id){
        
        $this->loadModel("Clients");
        $client = $this->Clients->GetInfo($id);
        
        debug($client);
        die();
        $response = new UsersRequestHandler\GetRecoveryResponse();
        try{
            $this->Clients->RecoveryPassword($data["username"]);
            $response->init(true);
        }catch (\Exception $e) {
            $response->init(true);
            $response->initError($e->getMessage());         
        }
        
        parent::setJson($response);
    }
}

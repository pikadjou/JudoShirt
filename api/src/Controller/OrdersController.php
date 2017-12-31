<?php
namespace App\Controller;


use App\Controller\AppController;
use App\Services\UsersRequestHandler;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class OrdersController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');        
    }

    public function all($token){
        
        $this->loadModel("Clients");
        $client = $this->Clients->GetActiveUser($token);

        $list = $this->Orders->all($client->id);

        debug($list);
        die();
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
}

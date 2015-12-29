<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\PromotionsRequestHandler;
/**
 * Promotions Controller
 *
 * @property \App\Model\Table\PromotionsTable $Promotions
 */
class PromotionsController extends AppController
{

     public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
         
        // $this->render('index');
    }
    
    public function getActive(){
        
        $query = $this->Promotions->getActive();
        
        $promotions = $query->toArray();
        
        $response = new PromotionsRequestHandler\GetPromotionsResponse();
        $response->init($promotions);

        parent::setJson($response);
    }
}

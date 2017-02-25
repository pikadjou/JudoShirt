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
    
    public function getSlide(){

        $query = $this->Promotions->getSlide();
        
        $promotions = $query->toArray();
        debug($promotions);
        //die();
        $response = new PromotionsRequestHandler\GetPromotionsResponse();
        $response->init($promotions);

        parent::setJson($response);
    }
    
    public function getPromotion($id){
        
        $query = $this->Promotions->getOne($id);
        
        $promotion = $query->first();
        
        $response = new PromotionsRequestHandler\GetPromotionResponse();
        $response->init($promotion);

        parent::setJson($response);
    }
    
    public function getBestPromotionCode(){
        
        $promotion = $this->Promotions->getBestByCode();
        
        $response = new PromotionsRequestHandler\GetBestPromotionResponse();
        $response->init($promotion);

        parent::setJson($response);
    }
}

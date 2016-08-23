<?php
namespace App\Controller;

use Cake\Cache\Cache;
use App\Controller\AppController;
use App\Services\ShippingRequestHandler;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class ShippingController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        
    }
    
    public function getShipping()
    {
        $key = "ShippingController-getShipping";
        //Cache::delete($key);
        if (($response = Cache::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $countries = $this->Shipping->getAllCountry();
        
        $response = new ShippingRequestHandler\GetShippingResponse();
        $response->init($countries);

//        debug($response);
        Cache::write($key, $response);
        parent::setJson($response);
    }
    
}

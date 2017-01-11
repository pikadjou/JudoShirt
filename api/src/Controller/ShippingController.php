<?php
namespace App\Controller;

use App\Model\Cache;

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
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $countries = $this->Shipping->getAllCountry();
        
        $response = new ShippingRequestHandler\GetShippingResponse();
        $response->init($countries);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }
    
}

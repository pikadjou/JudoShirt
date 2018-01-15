<?php
namespace App\Controller;

use App\Model\Cache;

use App\Controller\AppController;


/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */

class CouponsController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function all()
    {
        $key = "CouponsController-all";
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $coupons = $this->Coupons->all();
        

        debug($coupons);

        die();
        //$this->Articles->addProduct($query);
        //$this->Articles->addAppearence($query);
        
        //$articles = $query->toArray();
        
        $response = new ArticlesRequestHandler\GetArticlesByDesignResponse();
        $response->init($articles);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }

}

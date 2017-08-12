<?php
namespace App\Controller;

use App\Model\Cache;

use App\Controller\AppController;
use App\Services\SearchRequestHandler;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */

class SearchController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        
        $this->loadModel("Designs");
        $this->loadModel("Articles");
        $this->loadModel("Products");
        
        
    }
    
    public function getSearchList($term = "")
    {
        $key = "SearchController-getSearchList".$term;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        
        $designs = $this->Designs->findBySearchTerm($term)->toArray();
        $articles = $this->Articles->findBySearchTerm($term)->toArray();
        $products = $this->Products->findBySearchTerm($term)->toArray();
        
        $response = new SearchRequestHandler\GetSearchListResponse();
        $response->init($designs, $articles, $products);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }    
    
}

<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\ProductsRequestHandler;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class ProductsController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        
    }
    
    public function getProducts($id)
    {
       
        $query = $this->Products->findAll();
        
        $this->Products->addType($query);
        
        //$query->cache('cache_key');
        $products = $query->toArray();
               
        $response = new ProductsRequestHandler\GetProductsResponse();
        $response->init($products, $design);

        parent::setJson($response);
    }
    
    public function getProduct($id = null)
    {
        
        $query = $this->Products->getOneNoCache($id);
        $this->Products->addDesign($query);
        $product = $query->first();
        debug($product);
        $response = new ProductsRequestHandler\GetProductResponse();
        $response->init($product);

        parent::setJson($response);

    }
    
    public function updateAllProducts(){
        
        $this->Products->updateAllProducts();
    
    }
    
}

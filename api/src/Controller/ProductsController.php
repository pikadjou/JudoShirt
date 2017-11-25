<?php
namespace App\Controller;

use App\Model\Cache;

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
    
    public function getProducts()
    {
        $key = "ProductsController-getProducts";
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $products = $this->Products->getAll();
               
        $response = new ProductsRequestHandler\GetProductsResponse();
        $response->init($products);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }

    public function getProduct($id)
    {
        $key = "ProductsController-getProduct-".$id;
        //Cache::delete($key);
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        
        $product = $this->Products->getOne($id);
        debug($product);
        $response = new ProductsRequestHandler\GetProductResponse();
        $response->init($product, null);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);

    }
    
    public function updateAllProducts(){
        
        $this->Products->updateAllProducts();
    
    }
    
}

<?php
namespace App\Controller;

use Cake\Cache\Cache;

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
        
        $this->loadModel("Articles");

    }
    
    public function getProducts()
    {
        $key = "ProductsController-getProducts";
        //Cache::delete($key);
        if (($response = Cache::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $query = $this->Products->getAll();
        
//        $this->Products->addType($query);
        
        $products = $query->toArray();
               
        $response = new ProductsRequestHandler\GetProductsResponse();
        $response->init($products);

        Cache::write($key, $response);
        parent::setJson($response);
    }
    
    public function getProduct($id)
    {
        $key = "ProductsController-getProduct-".$id;
        //Cache::delete($key);
        if (($response = Cache::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        
        $query = $this->Products->getOne($id);
        $product = $query->first();
        
        $query = $this->Articles->getAllByProductId($id);
        $this->Articles->addDesign($query);

        $artciles = $query->toArray();

        $response = new ProductsRequestHandler\GetProductResponse();
        $response->init($product, $artciles);

        Cache::write($key, $response);
        parent::setJson($response);

    }
    
    public function updateAllProducts(){
        
        $this->Products->updateAllProducts();
    
    }
    
}

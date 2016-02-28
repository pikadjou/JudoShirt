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
        
         $this->loadModel("Designs");

    }
    /**
     * Index method
     *
     * @return void
     */
    public function getProducts($id)
    {
        $query = $this->Designs->getByShopId($id);
        $this->Designs->addCategories($query);
        $design = $query->first();
        
        $query = $this->Products->findByDesign($design);
        
        $this->Products->addType($query);
        
        $products = $query->toArray();
               
        $response = new ProductsRequestHandler\GetProductsResponse();
        $response->init($products, $design);

        parent::setJson($response);
    }
    
    public function getProduct($id = null)
    {
        
        $query = $this->Products->getByShopIdNoCache($id);
        $product = $query->first();
        
        $response = new ProductsRequestHandler\GetProductResponse();
        $response->init($product);

        parent::setJson($response);

    }
}

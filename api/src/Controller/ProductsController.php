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
         
         //$this->render('index');
    }
    /**
     * Index method
     *
     * @return void
     */
    public function getProducts($id)
    {
       $query = $this->Designs->getByShopId($id);
       $design = $query->first();
        
        $query = $this->Products->findByDesign($design);
        $products = $query->toArray();
               
        $response = new ProductsRequestHandler\GetProductsResponse();
        $response->init($products);

        parent::setJson($response);
    }
    
    public function getProduct($id = null)
    {
        $id = 104331399;
       // $query = $this->Designs->getOneByShopId($id);
        //$design = $query->first();
        
        $query = $this->Products->getByShopId($id);
        //$product = $query->first();
               
      //  $response = new ProductsRequestHandler\GetProductsResponse();
      //  $response->init($products);

      //  parent::setJson($response);

    }
}

<?php
namespace App\Controller;

use App\Controller\AppController;
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
    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $products = $this->Products->getAllByDesign(120416418);
        //$products = $query->toArray();
        
        debug($products);
        /*
        $response = new CategoriesRequestHandler\GetCategoriesResponse();
        $response->init($categories);

        parent::setJson($response);
         * */

    }
}

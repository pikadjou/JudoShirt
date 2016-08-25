<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\CategoriesRequestHandler;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class CategoriesController extends AppController
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
        $query = $this->Categories->getParents();
        $this->Categories->addChildren($query);
        
        $categories = $query->toArray();
        
        $response = new CategoriesRequestHandler\GetCategoriesResponse();
        $response->init($categories);

        parent::setJson($response);
    }
}

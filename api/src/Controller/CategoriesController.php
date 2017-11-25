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
    public function findAll()
    {
       
        $categories = $this->Categories->findSports();
        
        $response = new CategoriesRequestHandler\GetCategoriesResponse();
        $response->init($categories);

        parent::setJson($response);
    }
}

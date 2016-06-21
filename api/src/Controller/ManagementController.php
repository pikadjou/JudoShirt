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
        
        $this->loadModel("Productslist");
    }
    /**
     * Index method
     *
     * @return void
     */
    public function encodeProductsList()
    {
       
    }

}

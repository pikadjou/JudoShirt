<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\PrintsRequestHandler;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class PrintsController extends AppController
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
    public function getPrints()
    {
        $query = $this->Prints->getAll();
        $prints = $query->toArray();
        
        //debug($prints);
        $response = new PrintsRequestHandler\GetPrintsResponse();
        $response->init($prints);

        parent::setJson($response);
    }

}

<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\CmsRequestHandler;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class CmsController extends AppController
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
    public function getRoutes()
    {
        $query = $this->Cms->getVisible();
        
        $cms = $query->toArray();
        
        $this->loadModel("Configs");

        $configs = $this->Configs->getFrontConfig();

        $response = new CmsRequestHandler\GetRoutesResponse();
        $response->init($cms, $configs);

        parent::setJson($response);
    }

}

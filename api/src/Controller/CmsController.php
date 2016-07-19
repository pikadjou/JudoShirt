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
        
        $response = new CmsRequestHandler\GetRoutesResponse();
        $response->init($cms);

        parent::setJson($response);
    }

}

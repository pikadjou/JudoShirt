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
       
        $categories = $this->Categories->findWithDesigns();
        
        $categories = $this->_filterEmpty($categories);

        $response = new CategoriesRequestHandler\GetCategoriesResponse();
        $response->init($categories);

        parent::setJson($response);
    }

    private function _filterEmpty($categories){

        
        for($i = 0, $l = count($categories); $i < $l; $i++){
            $category = $categories[$i];

            for($iC = 0, $lC = count($category->children); $iC < $lC; $iC++){
                $child = $category->children[$iC];
                if(count($child->design) === 0){

                    unset($category->children[$iC]);
                    $category->children = array_values($category->children);

                    $iC--; $lC--;
                    
                }
            }
            if(count($category->children) === 0){

                unset($categories[$i]);
                $categories = array_values($categories);                

                $i--; $l--;
                
            }
        }

        return $categories;

    }
}

<?php
namespace App\Controller\Admin;

/**
 * CategoriesDesigns Controller
 *
 * @property \App\Model\Table\CategoriesDesignsTable $CategoriesDesigns
 */
class CategoriesDesignsController extends AdminJoinAppController
{

     public function initialize()
    {
        $this->model = $this->Categoriesdesigns;
        
        parent::initialize();

    }
}

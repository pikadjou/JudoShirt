<?php
namespace App\Controller\Admin;

/**
 * CategoriesDesigns Controller
 *
 * @property \App\Model\Table\CategoriesDesignsTable $CategoriesDesigns
 */
class ProductsTypesController extends AdminJoinAppController
{

    public function initialize()
    {
        $this->model = $this->Productstypes;
        
        parent::initialize();

    }
}

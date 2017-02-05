<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class ProductsViewsController extends AdminJoinAppController
{

    public function initialize()
    {
        $this->model = $this->Productsviews;

        parent::initialize();
    }

}

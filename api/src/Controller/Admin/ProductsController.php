<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class ProductsController extends AdminAppController
{

    public function initialize()
    {
        $this->model = $this->Products;
    }

}

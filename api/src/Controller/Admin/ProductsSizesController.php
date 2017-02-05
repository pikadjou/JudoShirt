<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class ProductsSizesController extends AdminJoinAppController
{

    public function initialize()
    {
        $this->model = $this->ProductssizesController;

        parent::initialize();
    }

}

<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class SizesController extends AdminAppController
{

    public function initialize()
    {
        $this->model = $this->Sizes;
    }

}

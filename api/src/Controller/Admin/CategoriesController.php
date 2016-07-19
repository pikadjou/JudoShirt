<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class CategoriesController extends AdminAppController
{

    public function initialize()
    {
        $this->model = $this->Categories;
        $this->associations = [
            "" => ["Children"],
            'parent_id' => "Parent"
        ];
    }

}

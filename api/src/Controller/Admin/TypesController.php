<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;


class TypesController extends AdminAppController
{

    public function initialize()
    {
        $this->model = $this->Types;
    }
    
}

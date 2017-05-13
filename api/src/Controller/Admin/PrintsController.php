<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;


class PrintsController extends AdminAppController
{

    public function initialize()
    {
        $this->model = $this->Prints;
    }
    
}

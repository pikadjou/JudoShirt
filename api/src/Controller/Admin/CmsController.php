<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;


class CmsController extends AdminAppController
{

    public function initialize()
    {
        $this->model = $this->Cms;
        $this->order = ['id', 'name'];
    }

    
}

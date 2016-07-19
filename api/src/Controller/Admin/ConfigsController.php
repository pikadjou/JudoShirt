<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;


class ConfigsController extends AdminAppController
{

    public function initialize()
    {
        $this->model = $this->Configs;
        $this->order = ['name', 'id'];
    }

}

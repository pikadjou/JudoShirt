<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;

/**
 * Groups Controller
 *
 * @property \App\Model\Table\GroupsTable $Groups
 */
class GroupsController extends AdminAppController
{

    public function initialize()
    {
        parent::initialize();
        $this->model = $this->Groups;
        $this->order = ['id'];
    }
}

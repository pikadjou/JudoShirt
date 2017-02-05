<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Configs Controller
 *
 * @property \App\Model\Table\ConfigsTable $Configs
 */
class ConfigsController extends AppController
{

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $this->set('configs', $this->paginate($this->Configs));
        $this->set('_serialize', ['configs']);
    }
}

<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 */
class UsersController extends AdminAppController
{

    public function initialize()
    {
        parent::initialize();
        $this->model = $this->Users;
        $this->order = ['id'];
        $this->associations = [
            'group_id' => "Groups"
        ];
    }

    public function login() {
        if ($this->request->is('post')) {
            $user = $this->Auth->identify();
            if ($user) {
                $this->Auth->setUser($user);
                return $this->redirect($this->Auth->redirectUrl());
            }
            $this->Flash->error(__('Your username or password was incorrect.'));
        }
    }

    public function logout() {
        $this->Flash->success(__('Good-Bye'));
        $this->redirect($this->Auth->logout());
    }
}

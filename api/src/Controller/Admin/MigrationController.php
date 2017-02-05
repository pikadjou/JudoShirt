<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link      http://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller\Admin;

use App\Controller\AppController;
use Migrations\Migrations;


/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link http://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class MigrationController extends AppController
{
    
    public function index()
    {
        $migrations = new Migrations();

        // Will return an array of all migrations and their status
        $status = $migrations->status();

        $this->set('migrations', array_reverse($status));
        $this->set('_serialize', ['status']);
    }
    
    public function mark($id)
    {
        $migrations = new Migrations();

        $migrate = $migrations->markMigrated($id);

        if($migrate){
            $this->Flash->success(__('Migration is ok'));
        }else{
            $this->Flash->error(__('Migration is not ok'));
        }
        return $this->redirect(['action' => 'index']);
    }

    public function upgrade()
    {
        $migrations = new Migrations();

        $migrate = $migrations->migrate();

        if($migrate){
            $this->Flash->success(__('Migration is ok'));
        }else{
            $this->Flash->error(__('Migration is not ok'));
        }
        return $this->redirect(['action' => 'index']);
    }

    public function downgrade()
    {
        $migrations = new Migrations();
        
        $migrate = $migrations->rollback();

        if($migrate){
            $this->Flash->success(__('Migration is ok'));
        }else{
            $this->Flash->error(__('Migration is not ok'));
        }
        return $this->redirect(['action' => 'index']);
    }

    public function seed()
    {
        $migrations = new Migrations();
        
        $migrate = $migrations->seed();

        if($migrate){
            $this->Flash->success(__('Migration is ok'));
        }else{
            $this->Flash->error(__('Migration is not ok'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
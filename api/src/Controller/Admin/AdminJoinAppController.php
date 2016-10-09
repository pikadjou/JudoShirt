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


/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link http://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class AdminJoinAppController extends AdminAppController
{
    public $join = [];
    
    public function initialize()
    {
        parent::initialize();
        
        $this->order = ['priority', 'id'];
 
        $index = 1;
        foreach ($this->model->associations()as $k => $v){
            $this->join[$index] = $v;

            $this->join[$index]->structure = $this->_getColumnsType($v);
            
            $joinkey = $v->foreignKey();
            $this->join[$index]->joinalias = explode('_', $joinkey)[0];
            $index++;
        }
    }
    
    public function index($tableMain = 1)
    {
        $query = $this->model->find()->contain([$this->join[1]->name(), $this->join[2]->name()]);
        
        $orderTable = $this->join[$tableMain];
        
        foreach($this->order as $v){
            if(!array_key_exists($v , $orderTable->structure)){
                continue;
            }
            $query->order($orderTable->name() .".".$v);
        }
        
        $query->order($orderTable->foreignKey());
        
        $join[1] = $this->join[$tableMain];
        
        foreach($this->join as $k => $v){

            if($k != $tableMain){
                $join[count($join) + 1] = $v;
            }
        }
          
        $this->set('mainView', $tableMain);
        $this->set('otherView', ($tableMain==1) ? 2 : 1);

        $this->set('joins', $join);
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas', "joins"]);
        
        $this->render('/Admin/Join/index');
    }
    
     public function view($tableMain = 1, $id = null)
    {
        $query = $this->model->find()->contain([$this->join[1]->name(), $this->join[2]->name()]);
        
        $orderTable = $this->join[$tableMain];
        
        $query->where([$orderTable->alias() . ".id" => $id]);
        
        $join[1] = $this->join[$tableMain];
        
        foreach($this->join as $k => $v){

            if($k != $tableMain){
                $join[count($join) + 1] = $v;
            }
        }
        
        $this->set('mainView', $tableMain);
        $this->set('otherView', ($tableMain==1) ? 2 : 1);
        
        $this->set('joins', $join);
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas', "joins"]);
        
        $this->render('/Admin/Join/view');
        
    }


    /**
     * Edit method
     *
     * @param string|null $id Design id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($tableMain = 1, $id = null)
    {
        if(!$id){
            return;
        }
        $join[1] = $this->join[$tableMain];
        
        foreach($this->join as $k => $v){
            if($k != $tableMain){
                $join[count($join) + 1] = $v;
            }
        }
        
        $query = $this->model->find()->contain([$this->join[1]->name(), $this->join[2]->name()]);

        $query->where([$this->join[$tableMain]->alias() . ".id" => $id]);
        
        $otherView = ($tableMain==1) ? 2 : 1;
        $queryList = $this->model->find()->contain([$this->join[$otherView]->name()]);
        
        $queryList->distinct([$this->join[$otherView]->foreignKey()]);

        if ($this->request->is(['patch', 'post', 'put'])) {
            $datas = $this->request->data;
                //debug($datas);
            foreach ($query as $entity){
                
                if(!in_array($entity[$join[2]->joinalias]->id, $datas) || 
                        $datas[$entity[$join[2]->joinalias]->id] == 0){
                    $this->model->delete($entity);
                }
                
                //unset($datas[$entity[$join[2]->joinalias]->id]);
            }
            //debug($datas);
            
            foreach ($datas as $key => $data){
                
                if($data == 0){
                    continue;
                }
                $entity = $this->model->find()->where([$join[1]->foreignKey() => $id, $join[2]->foreignKey() => $key])->first();
                
                if($entity){
                    continue;
                }
                
                $entity = $this->model->newEntity();

                $entity[$join[1]->foreignKey()] = $id;
                $entity[$join[2]->foreignKey()] = $key;
                $this->model->save($entity);
            }

        }
        
        $this->set('mainView', $tableMain);
        $this->set('otherView', ($tableMain==1) ? 2 : 1);
        
        $this->set('allowField', ['id', 'name', 'short' , 'thumbnail']);
        
        $this->set('joins', $join);
        $this->set('datas', $query);
        $this->set('datasList', $queryList);

        $this->set('_serialize', ['datas', 'datasList', "joins"]);
        
        $this->render('/Admin/Join/edit');
    }
    
    /**
     * Delete method
     *
     * @param string|null $id Design id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $data = $this->model->get($id);
        if ($this->model->delete($data)) {
            $this->Flash->success(__('The data has been deleted.'));
        } else {
            $this->Flash->error(__('The data could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}
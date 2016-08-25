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
    
    public function initialize()
    {
        parent::initialize();
        
    }
    
    public function index()
    {

        $query = $this->model->find()->order($this->order);
        
        $this->set('types', $this->_getColumnsType());
        $this->set('datas', $this->paginate($query));
        $this->set('_serialize', ['datas', "types"]);
        
//        debug($this->paginate($this->model));
        $this->render('/Admin/Join/index');
    }
    
     public function view($id = null)
    {
        $data = $this->model->get($id,[
            'contain' => $this->_getAssociationModel()
         ]);
        
        $this->set('types', $this->_getColumnsType());

        $this->set('data', $data);
        $this->set('_serialize', ['data', "types"]);
        
        $this->render('/Admin/view');
    }


    /**
     * Edit method
     *
     * @param string|null $id Design id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $entity = null;
        if($id){
             $entity = $this->model->get($id, [
                'contain' => $this->_getAssociationModel()
            ]);
        }
        if(!$entity){
            $entity = $this->model->newEntity();
        }
        if ($this->request->is(['patch', 'post', 'put'])) {
            $data = $this->request->data;
//            debug($data);
//            return;
            //$entity->set($data, ['guard' => false]);
            $entity = $this->model->patchEntity($entity, $data, ['validate' => false]);
                        
            if ($this->model->save($entity)) {
                $this->Flash->success(__('The data has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The data could not be saved. Please, try again.'));
            }
        }
        
        $associationsList = [];
        foreach ($this->associations as $key => $value) {
            if($key === ""){
                continue;
            }
            $associationsList[$value] = $this->model->$value->find('list', ['limit' => 200]);
        }
        
        $this->set('associations', $this->associations);
        $this->set('types', $this->_getColumnsType());
        $this->set(compact('entity', 'associationsList'));  /*, 'categories', 'tags'*/
        $this->set('_serialize', ["entity", "types", "associations"]);
        
        $this->render('/Admin/edit');

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
    
    protected function _getColumnsType($model = null){
        
        if($model === null){
            $model = $this->model;
        }
        
        $return = [];
        foreach($model->schema()->columns() as $column){
            $return[$column] = $this->model->schema()->columnType($column);
        }
        
        return $return;
    }
    
    protected function _getAssociationModel(){
        
        $return = [];
        foreach ($this->associations as $key => $value) {
            if($key === ""){
                $return = array_merge($return, $value);
            }else{
                $return[] = $value;
            }
        }
        return $return;
    }
}
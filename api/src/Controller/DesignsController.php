<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\DesignsRequestHandler;

/**
 * Designs Controller
 *
 * @property \App\Model\Table\DesignsTable $Designs
 */
class DesignsController extends AppController
{

    public function initialize()
    {
        parent::initialize();
       $this->loadComponent('RequestHandler');
       
       
       $this->loadModel("Categories");
    }
    /**
     * Index method
     *
     * @return void
     */
    public function getDesigns($catId = null)
    {
        if($catId === null){
            $query = $this->Designs->getAll();
        }else{
            $query = $this->Designs->getAllById($catId);
        }
        $query->contain([
            'Categories'
        ]);
        $query->contain([
            'Tags'
        ]);
        
        $designs = $query->toArray();
        
        $category = null;
        if($catId !== null){
            $category = $this->Categories->getOne($catId)->first();    
        }
        
        $response = new DesignsRequestHandler\GetDesignsResponse();
        $response->init($designs, $category);
        
        parent::setJson($response);
    }

    /**
     * Index method
     *
     * @return void
     */
    public function getInformationDesign($id)
    {
        $query = $this->Designs->getOne($id);
        
        $query->contain([
            'Categories'
        ]);
        $query->contain([
            'Tags'
        ]);
        
        $design = $query->first();
        
        
        $response = new DesignsRequestHandler\GetInformationDesignResponse();
        $response->init($design);
        
        parent::setJson($response);
    }
    /**
     * View method
     *
     * @param string|null $id Design id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        $design = $this->Designs->get($id, [
            'contain' => ['Categories', 'Tags']
        ]);
        $this->set('design', $design);
        $this->set('_serialize', ['design']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $design = $this->Designs->newEntity();
        if ($this->request->is('post')) {
            $design = $this->Designs->patchEntity($design, $this->request->data);
            if ($this->Designs->save($design)) {
                $this->Flash->success(__('The design has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The design could not be saved. Please, try again.'));
            }
        }
        $categories = $this->Designs->Categories->find('list', ['limit' => 200]);
        $tags = $this->Designs->Tags->find('list', ['limit' => 200]);
        $this->set(compact('design', 'categories', 'tags'));
        $this->set('_serialize', ['design']);
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
        $design = $this->Designs->get($id, [
            'contain' => ['Categories', 'Tags']
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $design = $this->Designs->patchEntity($design, $this->request->data);
            if ($this->Designs->save($design)) {
                $this->Flash->success(__('The design has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The design could not be saved. Please, try again.'));
            }
        }
        $categories = $this->Designs->Categories->find('list', ['limit' => 200]);
        $tags = $this->Designs->Tags->find('list', ['limit' => 200]);
        $this->set(compact('design', 'categories', 'tags'));
        $this->set('_serialize', ['design']);
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
        $design = $this->Designs->get($id);
        if ($this->Designs->delete($design)) {
            $this->Flash->success(__('The design has been deleted.'));
        } else {
            $this->Flash->error(__('The design could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}

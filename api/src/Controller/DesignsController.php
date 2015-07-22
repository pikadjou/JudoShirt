<?php
namespace App\Controller;

use App\Controller\AppController;

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
    }
    /**
     * Index method
     *
     * @return void
     */
    public function index($catId = null)
    {

        $designs = $this->Designs->find('all')
                                ->contain([
                                    'Tags', 
                                    'Categories'
                                ]);

        if($catId !== null){
            $designs->matching('Categories', function(\Cake\ORM\Query $q) use ($catId) {
                return $q->where([
                    'Categories.id' => $catId
                ]);
            });
        }
                                

        $this->set('designs', $designs);
        $this->set('_serialize', ['designs']);
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

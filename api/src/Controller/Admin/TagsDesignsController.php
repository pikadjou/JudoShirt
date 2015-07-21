<?php
namespace App\Controller\Admin;

use App\Controller\AppController;

/**
 * TagsDesigns Controller
 *
 * @property \App\Model\Table\TagsDesignsTable $TagsDesigns
 */
class TagsDesignsController extends AppController
{

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Tags', 'Designs']
        ];
        $this->set('tagsDesigns', $this->paginate($this->TagsDesigns));
        $this->set('_serialize', ['tagsDesigns']);
    }

    /**
     * View method
     *
     * @param string|null $id Tags Design id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        $tagsDesign = $this->TagsDesigns->get($id, [
            'contain' => ['Tags', 'Designs']
        ]);
        $this->set('tagsDesign', $tagsDesign);
        $this->set('_serialize', ['tagsDesign']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $tagsDesign = $this->TagsDesigns->newEntity();
        if ($this->request->is('post')) {
            $tagsDesign = $this->TagsDesigns->patchEntity($tagsDesign, $this->request->data);
            if ($this->TagsDesigns->save($tagsDesign)) {
                $this->Flash->success(__('The tags design has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The tags design could not be saved. Please, try again.'));
            }
        }
        $tags = $this->TagsDesigns->Tags->find('list', ['limit' => 200]);
        $designs = $this->TagsDesigns->Designs->find('list', ['limit' => 200]);
        $this->set(compact('tagsDesign', 'tags', 'designs'));
        $this->set('_serialize', ['tagsDesign']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Tags Design id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $tagsDesign = $this->TagsDesigns->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $tagsDesign = $this->TagsDesigns->patchEntity($tagsDesign, $this->request->data);
            if ($this->TagsDesigns->save($tagsDesign)) {
                $this->Flash->success(__('The tags design has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The tags design could not be saved. Please, try again.'));
            }
        }
        $tags = $this->TagsDesigns->Tags->find('list', ['limit' => 200]);
        $designs = $this->TagsDesigns->Designs->find('list', ['limit' => 200]);
        $this->set(compact('tagsDesign', 'tags', 'designs'));
        $this->set('_serialize', ['tagsDesign']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Tags Design id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $tagsDesign = $this->TagsDesigns->get($id);
        if ($this->TagsDesigns->delete($tagsDesign)) {
            $this->Flash->success(__('The tags design has been deleted.'));
        } else {
            $this->Flash->error(__('The tags design could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}

<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * CategoriesDesigns Controller
 *
 * @property \App\Model\Table\CategoriesDesignsTable $CategoriesDesigns
 */
class CategoriesDesignsController extends AppController
{

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $this->set('categoriesDesigns', $this->paginate($this->CategoriesDesigns));
        $this->set('_serialize', ['categoriesDesigns']);
    }

    /**
     * View method
     *
     * @param string|null $id Categories Design id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        $categoriesDesign = $this->CategoriesDesigns->get($id, [
            'contain' => []
        ]);
        $this->set('categoriesDesign', $categoriesDesign);
        $this->set('_serialize', ['categoriesDesign']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $categoriesDesign = $this->CategoriesDesigns->newEntity();
        if ($this->request->is('post')) {
            $categoriesDesign = $this->CategoriesDesigns->patchEntity($categoriesDesign, $this->request->data);
            if ($this->CategoriesDesigns->save($categoriesDesign)) {
                $this->Flash->success(__('The categories design has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The categories design could not be saved. Please, try again.'));
            }
        }
        $this->set(compact('categoriesDesign'));
        $this->set('_serialize', ['categoriesDesign']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Categories Design id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $categoriesDesign = $this->CategoriesDesigns->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $categoriesDesign = $this->CategoriesDesigns->patchEntity($categoriesDesign, $this->request->data);
            if ($this->CategoriesDesigns->save($categoriesDesign)) {
                $this->Flash->success(__('The categories design has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The categories design could not be saved. Please, try again.'));
            }
        }
        $this->set(compact('categoriesDesign'));
        $this->set('_serialize', ['categoriesDesign']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Categories Design id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $categoriesDesign = $this->CategoriesDesigns->get($id);
        if ($this->CategoriesDesigns->delete($categoriesDesign)) {
            $this->Flash->success(__('The categories design has been deleted.'));
        } else {
            $this->Flash->error(__('The categories design could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}

<?php
namespace App\Controller\Admin;

use App\Controller\AppController;

/**
 * Promotions Controller
 *
 * @property \App\Model\Table\PromotionsTable $Promotions
 */
class PromotionsController extends AppController
{

    /**
     * Index method
     *
     * @return void
     */
    public function index()
    {
        $this->set('promotions', $this->paginate($this->Promotions));
        $this->set('_serialize', ['promotions']);
    }

    /**
     * View method
     *
     * @param string|null $id Promotion id.
     * @return void
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function view($id = null)
    {
        $promotion = $this->Promotions->get($id, [
            'contain' => []
        ]);
        $this->set('promotion', $promotion);
        $this->set('_serialize', ['promotion']);
    }

    /**
     * Add method
     *
     * @return void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $promotion = $this->Promotions->newEntity();
        if ($this->request->is('post')) {
            $promotion = $this->Promotions->patchEntity($promotion, $this->request->data);
            if ($this->Promotions->save($promotion)) {
                $this->Flash->success(__('The promotion has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The promotion could not be saved. Please, try again.'));
            }
        }
        $this->set(compact('promotion'));
        $this->set('_serialize', ['promotion']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Promotion id.
     * @return void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $promotion = $this->Promotions->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $promotion = $this->Promotions->patchEntity($promotion, $this->request->data);
            if ($this->Promotions->save($promotion)) {
                $this->Flash->success(__('The promotion has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The promotion could not be saved. Please, try again.'));
            }
        }
        $this->set(compact('promotion'));
        $this->set('_serialize', ['promotion']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Promotion id.
     * @return void Redirects to index.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $promotion = $this->Promotions->get($id);
        if ($this->Promotions->delete($promotion)) {
            $this->Flash->success(__('The promotion has been deleted.'));
        } else {
            $this->Flash->error(__('The promotion could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }
}

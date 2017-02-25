<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;
use App\Model\Cache;

use \Cake\Error\Debugger;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class CachesController extends AdminAppController
{
    public function initialize()
    {
        parent::initialize();
        
        $this->order = ['lastUpdate', 'priority', 'id'];
    }

    public function other()
    {
        $this->set('_serialize', []);
    }
    public function files()
    {
        $this->set('caches', Cache\CacheModel::getAllValues());
        $this->set('_serialize', ['caches']);
    }

    public function viewFile($key)
    {
        $this->set('key', $key);
        $this->set('datas', Cache\CacheModel::read($key));
        //$this->set('_serialize', ['datas', 'key']);
    }
    public function deleteFile($key, $redirect = true)
    {
        $state = Cache\CacheModel::delete($key);

        if ($state) {
            $this->Flash->success(__('The data has been deleted.'));
        } else {
            $this->Flash->error(__('The data could not be deleted. Please, try again.'));
        }
        if($redirect){
            return $this->redirect(['action' => 'files']);
        }
            
    }
    public function deleteFileAll()
    {

        foreach( Cache\CacheModel::getAllValues() as $key => $v){
            $this->deleteFile($key);
        }
        return $this->redirect(['action' => 'files']);
    }
    
    public function db()
    {
        $tables = ["Designs", "Articles"];

        $datas = [];
        foreach($tables as $table){
            $this->loadModel($table);

            $query = $this->$table->find()->order($this->order)->select(['id', 'lastUpdate']);
            
            if($table === "Articles"){
                $query->select(["slug"]);
            }else{
                $query->select(["name"]);
            }
            $data = $query->toArray();
        
            $datas[$table] = $data;
        }

        $this->set('tables', $datas);
        $this->set('_serialize', ['tables']);
    }

    public function updateDB($table, $id, $redirect = true)
    {
        $this->loadModel("Articles");

        if($table === "Designs"){
            $this->loadModel("Designs");
            $design = $this->Designs->getOne($id)->first();
            $this->Articles->findByDesign($design, true);
        } else if($table === "Articles"){
            $this->Articles->getOne($id, true);
        }
        
           
        $this->Flash->success(__('The data has been upadated.'));
       
        if($redirect){
            return $this->redirect(['action' => 'db']);
        }
    }

    public function updateDBAll($table, $id = null){

        $this->loadModel("Articles");

        $articles = [];
        if($table === "Designs"){
            $this->loadModel("Designs");

            if($id === null){
                $designs = $this->Designs->getAllById()->toArray();

                foreach($designs as $design){
                    $this->updateDB("Designs", $design->id, false);
                }
            } else {
                $design = $this->Designs->getOne($id)->first();
                $articles = $this->Articles->findByDesign($design)->toArray();
            }
        } else if($table === "Articles"){
            $articles = $this->Articles->findAllArticles();
        }

        foreach($articles as $article){
            $this->updateDB("Articles", $article->id, false);
        }

        return $this->redirect(['action' => 'db']);
    }

    public function updatePrints()
    {
        $this->loadModel("Prints");

        $query = $this->Prints->update();
        
        
        $this->Flash->success(__('The data has been upadated.'));
        
        $this->redirect(['action' => 'list', 'controller' => "prints"]);
    }
}

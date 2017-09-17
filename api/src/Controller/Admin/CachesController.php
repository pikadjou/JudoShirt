<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;
use App\Model\Cache;

use \Cake\Error\Debugger;
use Cake\Log\Log;
use Cake\Routing\Router;

use App\Threaded;
require_once(ROOT . DS . 'vendor' . DS  . 'Threaded' . DS . 'ParallelCurl.php');

class CachesController extends AdminAppController
{
    public function initialize()
    {
        parent::initialize();
        
        $this->order = ['lastUpdate', 'priority', 'id'];

        //$this->Auth->allow('reloadAllProductCache');
        $this->Auth->allow();
    }

    public function reloadAllProductCache($id = ""){
        if($id === "1363f308-803d-11e7-bb31-be2e44b06b34"){

            Log::notice("Start update products ". date("d-m-Y H:i:s"));

            $this->render('/Admin/empty');
            set_time_limit(0);
             $this->loadModel("Designs");

            $designs = $this->Designs->getAll()->select(['id'])->toArray();

            $curl_options = array(
                CURLOPT_SSL_VERIFYPEER => FALSE,
                CURLOPT_SSL_VERIFYHOST => FALSE
            );
            $parallel_curl = new \ParallelCurl(10, $curl_options);
            Log::notice("Launch curl". date("d-m-Y H:i:s"));
            
            foreach($designs as $design){
                $url = Router::url(array('controller' => 'caches', 'action' => 'updateDB', "Designs", $design->id, 0), true);
                //Log::notice("url : $url");
                $parallel_curl->startRequest($url, __NAMESPACE__ .'\CachesController::on_design_done', $design->id);

                //$this->updateDB("Designs", $design->id, false);
            }
            Log::notice("All curl launched". date("d-m-Y H:i:s"));
            $parallel_curl->finishAllRequests();
            Log::notice("Finish update products ". date("d-m-Y H:i:s"));
        } else {
            return $this->redirect(['action' => 'index']);
        }
    }
    static public function on_design_done($content, $url, $ch, $id) {
    
        Log::notice("Finish design: $id ". date("d-m-Y H:i:s"));
        
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);    
        if ($httpcode !== 200) {
           Log::error("error reflow cache design: $id - httpcode : $httpcode - content : $content". date("d-m-Y H:i:s"));
            return;
        }
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
             Log::notice("start update design: $id ". date("d-m-Y H:i:s"));
            $this->loadModel("Designs");
            $design = $this->Designs->getOne($id)->first();
            $this->Articles->findByDesign($design, true);
            Log::notice("end update design: $id ". date("d-m-Y H:i:s"));
        } else if($table === "Articles"){
            $this->Articles->getOne($id, true);
        }
        
           
        $this->Flash->success(__('The data has been upadated.'));
       
        if($redirect){
            return $this->redirect(['action' => 'db']);
        }else{
            $this->render('/Admin/empty');
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
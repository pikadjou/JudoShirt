<?php
namespace App\Controller;

use Cake\Cache\Cache;
use App\Controller\AppController;
use App\Services\ArticlesRequestHandler;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class ArticlesController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        
         $this->loadModel("Designs");

    }
    
    public function getArticles($id)
    {
        $key = "ArticlesController-getArticles-".$id;
        //Cache::delete($key);
        if (($response = Cache::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $query = $this->Designs->getOne($id);
        $this->Designs->addCategories($query);
        $design = $query->first();
        
        $query = $this->Articles->findByDesign($design);
        
        $this->Articles->addProduct($query);
        
        $articles = $query->toArray();
        
        $response = new ArticlesRequestHandler\GetArticlesResponse();
        $response->init($articles, $design);

        Cache::write($key, $response);
        parent::setJson($response);
    }
    
    public function getArticle($id = null)
    {
        $query = $this->Products->getOneNoCache($id);
        $this->Products->addDesign($query);
        $product = $query->first();
        debug($product);
        $response = new ArticlesRequestHandler\GetArticleResponse();
        $response->init($product);

        parent::setJson($response);

    }
    
    
}

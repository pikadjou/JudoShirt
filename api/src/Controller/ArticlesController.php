<?php
namespace App\Controller;

use App\Model\Cache;

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
        if (($response = Cache\CacheController::read($key)) !== false) {
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

        Cache\CacheController::write($key, $response);
        parent::setJson($response);
    }
    
    public function getArticle($id = null)
    {
        $key = "ArticlesController-getArticle-".$id;
        if (($response = Cache\CacheController::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $query = $this->Articles->getOne($id);
        $article = $query->first();
        
        $response = new ArticlesRequestHandler\GetArticleResponse();
        $response->init($article);

        Cache\CacheController::write($key, $response);
        parent::setJson($response);

    }
    
    
}

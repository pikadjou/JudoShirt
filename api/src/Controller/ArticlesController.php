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
    
    public function getHilightArticles()
    {
        $key = "ArticlesController-getHilightArticles";
        if (($response = Cache\CacheController::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        
        $articles = $this->Articles->findHilightProducts();
        
        $response = new ArticlesRequestHandler\GetHilightResponse();
        $response->init($articles);

        Cache\CacheController::write($key, $response);
        parent::setJson($response);
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

    public function getArticlesByType($catId, $designId, $typesId)
    {
        if($designId == 0){
            $designId = null;
        }
        if($catId == 0){
            $catId = null;
        }
        if($typesId == 0){
            $typesId = "";
        }else{
            $typesId = explode(";", $typesId);
        }
        $key = "ArticlesController-getArticlesByType-".$catId."-".$designId."-".$typesId;
        if (($response = Cache\CacheController::read($key)) !== false) {
            parent::setJson($response);
            return;
        }

        $articles = $this->Articles->findArticlesByType($catId, $designId, $typesId);
        
        $response = new ArticlesRequestHandler\GetArticlesResponse();
        $response->init($articles);

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

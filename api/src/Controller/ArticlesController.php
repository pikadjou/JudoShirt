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
        
        //$this->loadModel("Designs");
        //$this->loadModel("Categories");
        

    }

    public function getArticlesByDesign($designId)
    {
        $key = "ArticlesController-getArticlesByDesign-".$designId;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }

        /*$query = $this->Designs->getOne($id);
        $this->Designs->addCategories($query);
        $design = $query->first();*/
        
        $articles = $this->Articles->findByDesignId($designId);
        
        //$this->Articles->addProduct($query);
        //$this->Articles->addAppearence($query);
        
        //$articles = $query->toArray();
        
        $response = new ArticlesRequestHandler\GetArticlesByDesignResponse();
        $response->init($articles);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }

    public function getArticle($id)
    {
        $key = "ArticlesController-getArticle-".$id;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $article = $this->Articles->getOne((int)$id);
        
        $response = new ArticlesRequestHandler\GetArticleResponse();
        $response->init($article);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);

    }

//Odl code
    public function getHilightArticles($catId = null)
    {
        $key = "ArticlesController-getHilightArticles";
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        
        if($catId === null){
            $catId = 1;
        }
        $articles = $this->Articles->findHilightProducts($catId);
        
        $response = new ArticlesRequestHandler\GetHilightResponse();
        $response->init($articles);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }
    public function getArticlesByCategory($catId = 0)
    {
        $key = "ArticlesController-getArticlesByCategory-$catId";
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }

        $articles = $this->Articles->findByCategories($catId);
        $category = $this->Categories->getOne($catId);
        
        $response = new ArticlesRequestHandler\getArticlesByCategoryResponse();
        $response->init($articles, $category);

        Cache\CacheModel::write($key, $response);
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
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }

        $articles = $this->Articles->findArticlesByType($catId, $designId, $typesId);
        
        $response = new ArticlesRequestHandler\GetArticlesResponse();
        $response->init($articles);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }
    
    /*public function getArticle($id = null)
    {
        $key = "ArticlesController-getArticle-".$id;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $query = $this->Articles->getOne($id);
        $article = $query->first();
        
        $response = new ArticlesRequestHandler\GetArticleResponse();
        $response->init($article);

        Cache\CacheModel::write($key, $response);
        parent::setJson($response);

    }*/
    
    
}

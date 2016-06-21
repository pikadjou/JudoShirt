<?php
namespace App\Controller;

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
        $query = $this->Designs->getOne($id);
        $this->Designs->addCategories($query);
        $design = $query->first();
        
        $query = $this->Articles->findByDesign($design);
        
        $this->Articles->addProduct($query);
        
        //$query->cache('cache_key');
        $articles = $query->toArray();
        
        $response = new ArticlesRequestHandler\GetArticlesResponse();
        $response->init($articles, $design);

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

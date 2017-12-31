<?php
namespace App\Model\Table;

use App\Model\Entity\Article;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

use Cake\Log\Log;
use Cake\Core\Configure;

use App\Model\WooCommerce;


class ArticlesTable extends AppTable
{

    private $_productsModel = null;
    private $_categoriesModel = null;
    private $_sizesModel = null;
    private $_appearancesModel = null;
    private $_variationsModel = null;    
    

    public function initialize(array $config)
    {
        
        $this->table('articles');
        $this->primaryKey('id');
        $this->belongsTo('Designs', [
            'foreignKey' => 'design_id'
        ]);
        $this->belongsTo('Products', [
            'foreignKey' => 'product_id'
        ]);
        
        $this->_productsModel = TableRegistry::get('Products');
        $this->_categoriesModel = TableRegistry::get('Categories');
        $this->_sizesModel = TableRegistry::get('Sizes');
        $this->_appearancesModel = TableRegistry::get('Appearances');
        $this->_variationsModel = TableRegistry::get('Variations');
        
    }
    
    public function all(){
        
        $articles = $this->_findAndMap();
        
        return $articles;
    }
    public function getOne($id){

        $article = $this->_findById($id);
        $article = $this->_linkPoduct([$article])[0];
        $article = $this->_linkVariations([$article])[0];
        
        return $article;
    }
    public function findByDesignId($designIds){
        
        $articles = $this->_findByCategoryIds([$designIds]);

        return $articles;
    }

    public function findByCategories($catIds = []){
        
        $articles = $this->_findByCategoryIds($catIds);
        return $articles;
    }

    public function getVariation($articleId, $variationId){

        $article = $this->getOne($articleId);

        $article = $this->_filterVariations($article, [$variationId]);

        return $article;
    }

//private methode
    private function _findById($id){
        $articles = $this->_findAndMap();

        foreach($articles as $article){
            if($article->id === $id){
                return $article;
            }
        }
        return null;
    }
    private function _findByCategoryIds($catIds = []){
        
        $articles = $this->_findAndMap();

        if(count($catIds) === 0){
            $filtersCollection = $this->_linkPoduct($articles);
            return $articles;
        }

        $filtersCollection = [];
        foreach($articles as $article){
            if(!$article->categories || count($article->categories) === 0){
                continue;
            }
            foreach($article->categories as $category){
                if(array_search($category->id, $catIds) === false){
                    continue;
                }

                $filtersCollection[] = $article;
            }
        }
        $filtersCollection = $this->_linkPoduct($filtersCollection);
        return $filtersCollection;
    }
    
    private function _find($options = []){
        if(array_key_exists("per_page", $options) === false){
            $options["per_page"] = 50;
        }
        $woo = WooCommerce\WooCommerce::getInstance();

        $woo->get("products", $options);

        return json_decode($woo->http->getResponse()->getBody());
    }
    private function _findAndMap($option = []){
        $articles = $this->_find($option);
        return $this->_formatArray($articles);
    }

    private function _linkPoduct($articles = []){
        foreach($articles as $article){
            $article->product = $this->_productsModel->getOne(2);
        }
        return $articles;
    }
    private function _linkVariations($articles = []){

        foreach($articles as $article){
            $article = $this->_variationsModel->setVariations($article);
        }
        return $articles;
    }
    private function _filterVariations($article, $variationsId){
        $variations = [];

        foreach($article->variations as $variation){
            if(array_search ($variation->id, $variationsId) !== false){
                $variations[] = $variation;
            }
        }
        $article->variations = $variations;

        return $article;
    }
    protected function _formatArray($articles){

        $return = [];
        foreach($articles as $article){
            $return[] = $this->_mapping($article);
        }
        return $return;
    }
    private function _mapping($wooArticle){

        $article = new Article();
        $article->id = $wooArticle->id;
        $article->slug = $wooArticle->slug;
        $article->name = $wooArticle->name;
        $article->content = $wooArticle->description;
        $article->price = $wooArticle->price;

        $article->visible = $wooArticle->catalog_visibility === "visible" ? true : false;

        if(property_exists ($wooArticle, "images") && count($wooArticle->images) > 0){
            $article->thumbnail = $wooArticle->images[0]->src;
        }
/*
        $priority = 0;	
        $extra = "";
        */
        foreach($wooArticle->categories as $category){
            $article->categories[] = $this->_categoriesModel->mapping($category);
        }
        if(property_exists ($wooArticle, "attributes") && count($wooArticle->attributes) > 0){
            $article->sizes = $this->_sizesModel->mappingByAttribute($wooArticle->attributes);
            $article->appearances = $this->_appearancesModel->mappingByAttribute($wooArticle->attributes);           
        }
        return $article;
    }
}

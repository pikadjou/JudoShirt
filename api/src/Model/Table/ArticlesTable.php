<?php
namespace App\Model\Table;

use App\Model\Entity\Product;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

use Cake\Core\Configure;
use App\Model\SpreadShirt;
/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
require_once(ROOT . DS . 'vendor' . DS  . 'SpreadShirt' . DS . 'HttpRequest.php');


class ArticlesTable extends Table
{
    protected $_spreadshirt = null;
//    
    private $_productsModel = null;
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    
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
        
        $this->_spreadshirt = new SpreadShirt\HttpRequest();
        $this->_desingsModel = TableRegistry::get('Designs');
        $this->_productsModel = TableRegistry::get('Products');
    }
    
    
    public function getOneNoCache($id){
        return $this->find()->where(["Articles.id" => $id])->limit(1);
    }
    public function getByShopIdNoCache($id){
        return $this->find()->where(["Articles.shopId" => $id])->limit(1);
    }
    public function getAllByProductId($id){
        return $this->find()->where(["Articles.product_id" => $id, "Articles.visible" => true]);
    }
    
    public function findArticlesByType($catId, $designId, $typesId){
        $query = $this->_find();

        if($catId){
            $query = $this->_byCategory($query, $catId);
        }
        if($designId){
            $query = $this->_byDesign($query, $designId);
        }
        if($typesId && count($typesId) > 0){
            $query = $this->_byTypes($query, $typesId);
        }

        return $query->contain(["Products"])->toArray();
    }
    public function findHilightProducts($catId){
        return $this->_findHilight(null, $catId)
                    ->contain([
                        'Products' => [
                            "Appearances"
                        ]
                    ])
                    ->toArray();
    }
    public function getOne($id){
        
        $article = $this->getOneNoCache($id)->first();
       
        if(!$article){
            return;
        }
        $shopId = $article->shopId;
        $lastUpdate = $article->lastUpdate;
        
        $date = new \DateTime();
        $actualTime = $date->getTimestamp();
        
        $date->sub(new \DateInterval('PT' . 12 . 'H'));
        $cacheTime = $date->getTimestamp();
        

        if(Configure::read('CacheUpdateDB') === false){
            $lastUpdate = null;
        }
                
        if($lastUpdate === null || $lastUpdate < $cacheTime){
            
            $url = $this->_spreadshirt->_urlShop . "/articles/". $shopId;

            $response = $this->_spreadshirt->getRequest($url);

            $response = simplexml_load_string($response);
            
            if(!$response){
                return;
            }
            
           
            //update product
            $productId = (string)$response->product->productType->attributes()->id;
            $this->_productsModel->updateProduct($productId);

            
            $extra = "view:".$response->product->defaultValues->defaultView->attributes()->id;
            $extra .= "-appearance:".$response->product->appearance->attributes()->id;

            $article->extra = $extra;
            $article->lastUpdate = $actualTime;
            
            $this->save($article);
            
            
        }
        
        $articles = $this->find()
                ->where(["Articles.id" => $id, "Articles.visible" => true])
                ->contain([
                    "Designs",
                    'Products' => [
                        "Views",
                        "Sizes",
                        "Appearances"
                    ]
                ]);
        
        return $articles;
    }
    
    public function findByDesign($design)
    {
        //debug($design);
        $id = $design->id;
        $lastUpdate = $design->lastProductsUpdate;
        
        $date = new \DateTime();
        $actualTime = $date->getTimestamp();
        
        $date->sub(new \DateInterval('PT' . 12 . 'H'));
        $cacheTime = $date->getTimestamp();
        

        if(Configure::read('CacheUpdateDB') === false){
            $lastUpdate = null;
        }       
        if($lastUpdate === null || $lastUpdate < $cacheTime){
            
            $this->_setDirty($id);
            $url = $this->_spreadshirt->_urlShop . "/articles?fullData=true&limit=1000&query=designIds:($design->shopId)";

            $response = $this->_spreadshirt->getRequest($url) ;
            $response = simplexml_load_string($response);
            if($response->article){
                foreach ($response->article as $article){
                    $articleId = (string)$article->attributes()->id;
                    //debug($articleId);
                    $articleModel = $this->getByShopIdNoCache($articleId)->first();

                    if(!$articleModel){
                        $articleModel = $this->newEntity();
                    }
                    
                   // debug($article->product);
                    $articleModel->shopId = $articleId;
                    $articleModel->design_id = $id;
                    
                    //product id
                    $idProductShop = (string)$article->product->productType->attributes()->id;
                    $product = $this->_productsModel->updateProduct($idProductShop)->first();
                    
                    $articleModel->product_id = $product->id;
                    
                    
                    $articleModel->name = (string)$article->name;

                   
                    $articleModel->slug = $design->name ." - ". $product->name;
        
                            
                    $articleModel->content = (string)$article->description;
                    $articleModel->price = (string)$article->price->vatIncluded;

                    $articleModel->thumbnail = (string)$article->resources->resource[0]->attributes('xlink', true);

                    $articleModel->dirty = false;
                    $this->save($articleModel);

                }

                $design->lastProductsUpdate = $actualTime;
                $this->_desingsModel->save($design);
            }
            
            $this->_deleteDirty();
        }
        
        $articles = $this->find()->where(["design_id" => $id, "Articles.visible" => true]);
        
        return $articles;
    }
    
    public function addProduct($query){
        $query->contain([
            'Products' => [
                'Types'
            ]
        ]);
    }
    
    public function addDesign($query){
        $query->contain([
            'Designs'
        ]);
    }
    
    
    private function _find(){
        return $this->find()
            ->where(["Articles.visible" => true])
            ->order('Articles.priority');
    }

    private function _byDesign($query, $designId){
        if($query == null){
            $query = $this->_find();
        }
        $query->matching('Designs', function(\Cake\ORM\Query $q) use ($designId) {
                return $q->where([
                    'Designs.id' => $designId
                ]);
            });

        return $query;
    }

    private function _byCategory($query, $catId){
        if($query == null){
            $query = $this->_find();
        }
        $query->matching('Designs.Categories', function(\Cake\ORM\Query $q) use ($catId) {
                return $q->where([
                    'Categories.id' => $catId
                ]);
            });

        return $query;
    }
    private function _byTypes($query, $typesId){
        if($query == null){
            $query = $this->_find();
        }
        $query->matching('Products.Types', function(\Cake\ORM\Query $q) use ($typesId) {
                return $q->where([
                    'Types.id IN' => $typesId
                ]);
            });

        return $query;
    }

    private function _findHilight($query = null, $catId){
        if($query == null){
            $query = $this->_find();
        }
        $query->where(["Articles.priority" => -1]);
        
        $this->_byCategory($query, $catId);

        $query->contain(["Products"]);

        return $query;
    }

    private function _setDirty($designId){
        
        $this->updateAll(
                ['dirty' => true], // champs
                ['design_id' => $designId]); // conditions
        
    
    }
    
    private function _deleteDirty(){
        $this->deleteAll(['dirty' => true]);
    }
}

<?php
namespace App\Model\Table;

use App\Model\Entity\Product;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

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
    
    private $_desingsModel = null;
    private $_productsModel = null;
//    
//    private $_productsTypesModel = null;
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
    
    
    public function findByDesign($design)
    {
        //debug($design);
        $id = $design->id;
        $lastUpdate = $design->lastProductsUpdate;
        
        $date = new \DateTime();
        $actualTime = $date->getTimestamp();
        
        $date->sub(new \DateInterval('PT' . 60 . 'M'));
        $cacheTime = $date->getTimestamp();
        
//        debug($lastUpdate);
//        debug($cacheTime);
        //$lastUpdate = null;
                
        if($lastUpdate === null || $lastUpdate < $cacheTime){
            
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
                    $product = $this->_productsModel->getOneByShopId($idProductShop)->first();

                    if(!$product){
                        $product = $this->_productsModel->updateProduct($idProductShop)->first();
                    }
                    $articleModel->product_id = $product->id;
                    
                    
                    $articleModel->name = (string)$article->name;
                    $articleModel->content = (string)$article->description;
                    $articleModel->price = (string)$article->price->vatIncluded;

                    $articleModel->thumbnail = (string)$article->resources->resource[0]->attributes('xlink', true);

                    //debug($product);
                    $this->save($articleModel);

                }

                $design->lastProductsUpdate = $actualTime;
                $this->_desingsModel->save($design);
            }
        }
        
        $articles = $this->find()->where(["design_id" => $id, "visible" => true]);
        
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
    
}

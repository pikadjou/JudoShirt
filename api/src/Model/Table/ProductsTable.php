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


class ProductsTable extends Table
{
    protected $_spreadshirt = null;
    
    private $_desingsModel = null;
    private $_typesModel = null;
    
    private $_productsTypesModel = null;
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    
    public function initialize(array $config)
    {
        
        //App::uses('HttpRequest', 'Model');
        
        $this->table('products');
        $this->primaryKey('id');
        $this->belongsTo('Designs', [
            'foreignKey' => 'design_id'
        ]);
        $this->belongsToMany('Types', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'type_id',
            'joinTable' => 'products_types'
        ]);
        
        $this->_spreadshirt = new SpreadShirt\HttpRequest();
        $this->_desingsModel = TableRegistry::get('Designs');
        $this->_typesModel = TableRegistry::get('Types');
        $this->_productsTypesModel = TableRegistry::get('ProductsTypes');
    }
    
    public function getOneNoCache($id){
        return $this->find()->where(["Products.id" => $id])->limit(1);
    }
    public function getByShopIdNoCache($id){
        return $this->find()->where(["Products.shopId" => $id])->limit(1);
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
            //debug($response);
            if($response->article){
                foreach ($response->article as $article){
                    $articleId = (string)$article->attributes()->id;
                    //debug($articleId);
                    $product = $this->getByShopIdNoCache($articleId)->first();

                    if(!$product){
                        $product = $this->newEntity();
                    }

                   // debug($article->product);
                    $product->shopId = $articleId;
                    $product->design_id = $id;
                    $product->name = (string)$article->name;
                    $product->content = (string)$article->description;
                    $product->price = (string)$article->price->vatIncluded;

                    $product->thumbnail = (string)$article->resources->resource[0]->attributes('xlink', true);

                    //debug($product);
                    $this->save($product);

                    $url = (string)$article->product->productType->attributes('xlink', true);
                    $url .= "?locale=fr_FR";

                    $this->addTypesToProduct($product, $url);

                }

                $design->lastProductsUpdate = $actualTime;
                $this->_desingsModel->save($design);
            }
        }
        
        $products = $this->find()->where(["design_id" => $id, "visible" => true])->order('priority');
        
        return $products;
    }
    
    public function addTypesToProduct($product, $url){
        //debug($url);
        $response = $this->_spreadshirt->getRequest($url) ;
        $response = simplexml_load_string($response);
        
        if(!$response){
            return;            
        }
        $product->name = (string)$response->name;
        
        $this->save($product);
        
        
        $types = $this->_typesModel->addTypesForProduct($response);

        for($i = 0, $l = count($types), $type = null; $i < $l; $i++){
            $type = $types[$i];
            $joinData = $this->_productsTypesModel->getByProductAndTypeId($product->id, (string)$type->id)->first();

            if(!$joinData){
                $type->_joinData = $this->_productsTypesModel->newEntity();
                $type->_joinData->name = $response->name;
                $this->Types->link($product, [$type]);
            }
        }
    }
    
    /*
     * Make join
     */
    
    public function addType($query){
        
        $query->contain([
            'Types'
        ]);
    }
    public function addDesign($query){
        
        $query->contain([
            'Designs'
        ]);
    }
    
}

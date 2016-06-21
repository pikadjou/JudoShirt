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
        $this->hasMany('Articles', [
            'foreignKey' => 'product_id',
            'dependent' => true,
        ]);
        $this->belongsToMany('Types', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'type_id',
            'joinTable' => 'products_types'
        ]);
        
        $this->_spreadshirt = new SpreadShirt\HttpRequest();
        $this->_typesModel = TableRegistry::get('Types');
        $this->_productsTypesModel = TableRegistry::get('ProductsTypes');
    }
    
    public function getOne($id){
        return $this->find()->where(["Products.id" => $id])->limit(1);
    }
    public function getOneByShopId($id){
        return $this->find()->where(["Products.shopId" => $id])->limit(1);
    }
    
    public function updateProduct($id){
         $url = $this->_spreadshirt->_urlShop . "/productTypes/".$id."?locale=fr_FR";

        $response = $this->_spreadshirt->getRequest($url) ;
        $response = simplexml_load_string($response);

        $this->_doUpdateProduct($response);
        
        return $this->getOneByShopId($id);
    }
    public function updateAllProducts()
    {
            
        $url = $this->_spreadshirt->_urlShop . "/productTypes?locale=fr_FR";

        $response = $this->_spreadshirt->getRequest($url) ;
        $response = simplexml_load_string($response);
        //debug($response);
        if($response->productType){
            foreach ($response->productType as $product){
                
                $this->_doUpdateProduct($product);

            }
        }
        
        return true;
    }
    
    private function _doUpdateProduct($xmlProduct){
        if(!$xmlProduct){
            return;
        }
        $productShopId = (string)$xmlProduct->attributes()->id;

        $productModel = $this->getOneByShopId($productShopId)->first();

        if(!$productModel){
            $productModel = $this->newEntity();
        }

        $productModel->shopId = $productShopId;
        $productModel->name = (string)$xmlProduct->name;

        $this->save($productModel);

        $this->addTypesToProduct($productModel, $productShopId);
    }
    public function addTypesToProduct($product, $id){
        
        $url = $this->_spreadshirt->_urlShop . "/productTypes/".$id."?locale=fr_FR";

        $response = $this->_spreadshirt->getRequest($url) ;
        $response = simplexml_load_string($response);
        
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
    
}

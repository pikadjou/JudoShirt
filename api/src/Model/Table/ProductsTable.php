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
    
    private $_appearancesModel = null;
    private $_productsAppearancesModel = null;
    
    private $_sizesModel = null;
    private $_productsSizesModel = null;
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    
    public function initialize(array $config)
    {
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
        $this->belongsToMany('Appearances', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'appearance_id',
            'joinTable' => 'products_appearances'
        ]);
        $this->belongsToMany('Sizes', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'size_id',
            'joinTable' => 'products_sizes'
        ]);
        $this->belongsToMany('Views', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'view_id',
            'joinTable' => 'products_views'
        ]);
        
        $this->_spreadshirt = new SpreadShirt\HttpRequest();
        
        $this->_typesModel = TableRegistry::get('Types');
        $this->_productsTypesModel = TableRegistry::get('ProductsTypes');
        
        
        $this->_appearancesModel = TableRegistry::get('Appearances');
        $this->_productsAppearancesModel = TableRegistry::get('ProductsAppearances');
        
        $this->_sizesModel = TableRegistry::get('Sizes');
        $this->_productsSizesModel = TableRegistry::get('ProductsSizes');
        
        $this->_viewsModel = TableRegistry::get('Views');
        $this->_productsViewsModel = TableRegistry::get('ProductsViews');
    }
    
    public function getAll(){
        
        $products = $this->find()->where(["Products.visible" => 1]);
        
        return $products;
    
    }
    public function getOne($id){
        return $this->find()->where(["Products.id" => $id])->limit(1);
    }
    public function getOneByShopId($id){
        return $this->find()->where(["Products.shopId" => $id])->limit(1);
    }
    
    public function updateProduct($shopId){
        
        $this->_doUpdateProduct($shopId);
        
        return $this->getOneByShopId($shopId);
    }
    public function updateAllProducts()
    {
            
        $url = $this->_spreadshirt->_urlShop . "/productTypes?locale=fr_FR";

        $response = $this->_spreadshirt->getRequest($url) ;
        $response = simplexml_load_string($response);
        //debug($response);
        if($response->productType){
            foreach ($response->productType as $product){
                
                $productShopId = (string)$product->attributes()->id;
                $this->_doUpdateProduct($productShopId);

            }
        }
        
        return true;
    }
    
    private function _doUpdateProduct($productShopId){
        if(!$productShopId){
            return;
        }
        
        $url = $this->_spreadshirt->_urlShop . "/productTypes/".$productShopId."?locale=fr_FR";

        $xmlProduct = $this->_spreadshirt->getRequest($url) ;
        $xmlProduct = simplexml_load_string($xmlProduct);


        $productModel = $this->getOneByShopId($productShopId)->first();

        if(!$productModel){
            $productModel = $this->newEntity();
        }

        $productModel->shopId = $productShopId;
        $productModel->name = (string)$xmlProduct->name;
        $productModel->short = (string)$xmlProduct->shortDescription;
        $productModel->content = (string)$xmlProduct->description;

        $productModel->thumbnail = (string)$xmlProduct->resources->resource[0]->attributes('xlink', true);
        $productModel->sizeThumbnail = (string)$xmlProduct->resources->resource[1]->attributes('xlink', true);
        
        $this->save($productModel);
        
        $this->addTypesToProduct($xmlProduct, $productModel);

        $this->addAppearancesToProduct($xmlProduct, $productModel);
        
        $this->addSizesToProduct($xmlProduct, $productModel);
        
        $this->addViewsToProduct($xmlProduct, $productModel);

    }
    public function addTypesToProduct($response, $product){

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
    
    public function addAppearancesToProduct($response, $product){
        
        $appearances = $this->_appearancesModel->addAppearancesForProduct($response);

        for($i = 0, $l = count($appearances), $appearance = null; $i < $l; $i++){
            $appearance = $appearances[$i];
            $this->_productsAppearancesModel->linkProductAndAppearanceId($product->id, $appearance->id);
            
        }
    }
    
    public function addSizesToProduct($response, $product){
        
        $sizes = $this->_sizesModel->addSizesForProduct($response);

        for($i = 0, $l = count($sizes), $size = null; $i < $l; $i++){
            $size = $sizes[$i];
            $this->_productsSizesModel->linkProductAndSizeId($product->id, $size->id);
        }
    }
    
    public function addViewsToProduct($response, $product){
        
        $views = $this->_viewsModel->addViewsForProduct($response);

        for($i = 0, $l = count($views), $view = null; $i < $l; $i++){
            $view = $views[$i];
            $this->_productsViewsModel->linkProductAndViewId($product->id, $view->id);
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

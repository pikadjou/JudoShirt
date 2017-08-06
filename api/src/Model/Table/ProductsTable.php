<?php
namespace App\Model\Table;

use App\Model\Entity\Product;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

use Cake\Log\Log;

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

    private $_measuresModel = null;
    private $_productsSizesMeasuresModel = null;
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
         $this->belongsToMany('Measures', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'measure_id',
            'joinTable' => 'products_sizes_measures'
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

        $this->_measuresModel = TableRegistry::get('Measures');
        $this->_productsSizesMeasuresModel = TableRegistry::get('ProductsSizesMeasures');
        
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

    public function findByGenders($types){

        $typeId = [];

        foreach($types as $v){
            $typeId[] = $v->id;
        }
        $query = $this->_matchWithType($this->_findActive(), $typeId);

        $query->group('Products.id');

        $query->select($this);
        return $query->toArray();


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
    
    private function _find(){
        
        $products = $this->find('all')
                        ->order('Products.priority');
        
        return $products;
    }
    private function _findActive(){

        $products = $this->_find()->where(["Products.visible" => true]);
        
        return $products;
    }

    private function _doUpdateProduct($productShopId){
        if(!$productShopId){
            return;
        }
        
        $url = $this->_spreadshirt->_urlShop . "/productTypes/".$productShopId."?locale=fr_FR";

        $xmlProduct = $this->_spreadshirt->getRequest($url) ;
        //debug($xmlProduct);
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
        
        $this->parseXmlFeatures($xmlProduct, $productModel);
        
    }

    private function _matchWithType($query, $typeId){

        return $query->matching(
                            'Types', function ($q) use ($typeId) {
                        return $q->where(["Types.id IN" => $typeId]);
                    }
                );
    }

    /*
        Join Table
    */
    public function parseXmlFeatures($xmlProduct, $productModel){

        $this->_addType($xmlProduct, $productModel);

        if($xmlProduct->appearances && $xmlProduct->appearances->appearance){
            foreach ($xmlProduct->appearances->appearance as $appearance){
                $this->_addAppearance($appearance, $productModel);
            }         
        }
        if($xmlProduct->sizes && $xmlProduct->sizes->size){
            foreach ($xmlProduct->sizes->size as $size){
                $sizeEntity = $this->_addSize($size, $productModel);

                if($size->measures && $size->measures->measure){
                    foreach ($size->measures->measure as $measure){
                    Log::debug(json_encode($measure));
                        
                        $this->_addMeasure($measure, $productModel, $sizeEntity);
                    }
                }
            }         
        }
        if($xmlProduct->views && $xmlProduct->views->view){
            foreach ($xmlProduct->views->view as $view){
                $this->_addView($view, $productModel);
            }         
        }
    }

    private function _addType($response, $product){

        $types = $this->_typesModel->addTypesByXML($response);

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
    
    private function _addAppearance($response, $product){
        
        $appearance = $this->_appearancesModel->addAppearanceByXML($response);

        $this->_productsAppearancesModel->linkProductAndAppearanceId($product->id, $appearance->id);
    }
    
    private function _addSize($response, $product){
        
        $size = $this->_sizesModel->addSizeByXML($response);

        $this->_productsSizesModel->linkProductAndSizeId($product->id, $size->id);

        return $size;
    }

    private function _addMeasure($response, $product, $size){
        
        $measure = $this->_measuresModel->addByXML($response);

        $this->_productsSizesMeasuresModel->linkProductSizeMeasureId($product->id,  $size->id, $measure->id);
    }
    
    private function _addView($response, $product){
        
        $view = $this->_viewsModel->addByXML($response);

        $this->_productsViewsModel->linkProductAndViewId($product->id, $view->id);
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

<?php
namespace App\Model\Table;

use App\Model\Entity\Variation;

use Cake\Log\Log;
use Cake\Core\Configure;
use Cake\ORM\TableRegistry;

use App\Model\WooCommerce;


class VariationsTable extends AppTable
{
    private $_sizesModel = null;
    private $_appearancesModel = null;

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
        
        $this->_sizesModel = TableRegistry::get('Sizes');
        $this->_appearancesModel = TableRegistry::get('Appearances');
    }
    
    public function setVariations($article){
        
        $variations = $this->_findVatiations($article->id);
        
        $article->variations = $variations;
        return $article;
    }
 
//private
    private function _findVatiations($id){
        $variations = $this->_findAndMap(['id' => $id]);

        return $variations;
    }
    private function _find($id, $options = []){
        if(array_key_exists("per_page", $options) === false){
            $options["per_page"] = 50;
        }
        $woo = WooCommerce\WooCommerce::getInstance();
        
        $woo->get("products/".$id."/variations");

        return json_decode($woo->http->getResponse()->getBody());
    }
    protected function _findAndMap($option = []){
        $id = $option['id'];

        $variations = $this->_find($id, $option);

        return $this->_formatArray($variations);
    }

    protected function _formatArray($variations){
        $return = [];
        foreach($variations as $variation){
            $return[] = $this->_mapping($variation);
        }
        return $return;
    }
    private function _mapping($wooVariation){

        $variation = new Variation();
        $variation->id = $wooVariation->id;

        $variation->price = $wooVariation->price;

        if(property_exists ($wooVariation, "image")){
            $variation->image = $wooVariation->image->src;
        }
        $variation->size = $this->_sizesModel->mappingByAttribute($wooVariation->attributes)[0];
        $variation->sizeId = $variation->size->id;
        $variation->appearance = $this->_appearancesModel->mappingByAttribute($wooVariation->attributes)[0];
        $variation->appearanceId = $variation->appearance->id;

        return $variation;
    }
}

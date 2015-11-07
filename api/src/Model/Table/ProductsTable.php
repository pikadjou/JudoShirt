<?php
namespace App\Model\Table;

use App\Model\Entity\Product;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

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
            'foreignKey' => 'category_id'
        ]);
        
        $this->_spreadshirt = new SpreadShirt\HttpRequest();
    }
    
    public function getAllByDesign($id)
    {
        //$products = $this->find()->where(["design_id" => $id]);
        $url = $this->_spreadshirt->_urlShop . "/articles?fullData=true&limit=1000&query=designIds:($id)";
        
        $response = $this->_spreadshirt->getRequest($url) ;
        $response = simplexml_load_string($response);
       // debug($response);
        
        foreach ($response->article as $article){
            $product = $this->newEntity();
            $product->design_id = $id;
            $product->name = (string)$article->name;
            $product->content = (string)$article->description;
            $product->price = (string)$article->price->vatIncluded;
            
            $product->thumbnail = (string)$article->resources->resource[0]->attributes('xlink', true);
            
            $this->save($product);
        }
        
    }

}

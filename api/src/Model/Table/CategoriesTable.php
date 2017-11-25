<?php
namespace App\Model\Table;

use App\Model\Entity\Category;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;

use App\Model\WooCommerce;

/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
class CategoriesTable extends AppTable
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('categories');
        $this->displayField('name');
        $this->primaryKey('id');
        $this->belongsToMany('Designs', [
            'foreignKey' => 'category_id',
            'targetForeignKey' => 'design_id',
            'joinTable' => 'categories_designs'
        ]);
        
        $this->hasMany('Children', [
            'className' => 'categories',
            'foreignKey' => 'parent_id',
            'dependent' => true,
        ]);
        $this->belongsTo('Parent', [
            'className' => 'categories',
            'foreignKey' => 'parent_id'
        ]);
    }
    
    public function all(){
        
        $categories = $this->_find();

        return $this->_formatArray($categories);
    }

    public function findSports(){
        
        $categories = $this->_find();
        $categories = $this->_formatArray($categories);

        foreach($categories as $category){
           if($category->name === "BySports"){
                return $category->children;
           }
        }

        return [];
    }

    public function findTypes(){
        
        $categories = $this->_find();

        $categories = $this->_formatArray($categories);

        foreach($categories as $category){
           if($category->name === "ByTypes"){
                return $category->children;
           }
        }

        return [];
    }

    public function mapping($category){
        return $this->_mapping($category);
    }
// Private Methode
    private function _formatArray($categories){
        $return = [];
        foreach($categories as $category){
            $return[] = $this->_mapping($category, $categories);
        }
        
        return array_filter($return, function($v, $k) {
            return $v->parent === 0;
        }, ARRAY_FILTER_USE_BOTH);
    }
    private function _mapping($wooCategory, $wooCategories = []){

        $category = new Category();

        $category->id = $wooCategory->id;
        $category->name = $wooCategory->name;

        if(property_exists ($wooCategory, "description"))
            $category->content = $wooCategory->description;
        if(property_exists ($wooCategory, "display"))     
            $category->visible = ($wooCategory->display === "default") ? true : false;
        if(property_exists ($wooCategory, "parent"))     
            $category->parent = $wooCategory->parent;
        if(property_exists ($wooCategory, "count"))
            $category->nbDesigns = $wooCategory->count;
        
        if(property_exists ($wooCategory, "image") && property_exists ($wooCategory->image, "src"))
            $category->picture = $wooCategory->image->src;

        if($wooCategories){
            $category->children = [];
            foreach($wooCategories as $wooChildren){
                if($wooChildren->parent !== $category->id){
                    continue;
                }
                $child = $this->_mapping($wooChildren, $wooCategories);
                $category->children[] = $child;
            }
        }
        

        return $category;
    }
    private function _find($options = []){
        if(array_key_exists("per_page", $options) === false){
            $options["per_page"] = 50;
        }
        $woo = WooCommerce\WooCommerce::getInstance();

        $woo->get("products/categories", $options);

        return json_decode($woo->http->getResponse()->getBody());
    }
}

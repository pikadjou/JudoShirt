<?php
namespace App\Model\Table;

use App\Model\Entity\Design;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

use Cake\ORM\TableRegistry;

/**
 * Designs Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Categories
 * @property \Cake\ORM\Association\BelongsToMany $Tags
 */
class DesignsTable extends Table
{

    private $_categoriesModel = null;
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('designs');
        $this->displayField('name');
        $this->primaryKey('id');
        $this->belongsToMany('Categories', [
            'foreignKey' => 'design_id',
            'targetForeignKey' => 'category_id',
            'joinTable' => 'categories_designs'
        ]);
        $this->belongsToMany('Tags', [
            'foreignKey' => 'design_id',
            'targetForeignKey' => 'tag_id',
            'joinTable' => 'tags_designs'
        ]);
        
        $this->hasMany('Articles', [
            'foreignKey' => 'design_id',
            'dependent' => true,
        ]);

        $this->_categoriesModel = TableRegistry::get('Categories');
    }
    
    /**
     * Default get all design by category id.
     *
     * @param 
     * @return App\Model\Table\DesignsTable
     */
    public function getAll()
    {
        $designs = $this->find('all')
                        ->where(["Designs.visible" => true])
                        ->order('Designs.priority');
        
        return $designs;
    }
    
    /**
     * Default get all design by category id.
     *
     * @param 
     * @return App\Model\Table\DesignsTable
     */
    public function getOne($id)
    {
        $design = $this->find()->where(["id" => $id])->limit(1);
        
        return $design;
    }
    
    public function getByShopId($id)
    {
        $design = $this->find()->where(["shopId" => $id])->limit(1);
        
        return $design;
    }
    
    
    public function getAllById($catId = null)
    {
        $designs = $this->_find();
        if($catId === null || $catId === 0){
            return $designs;
        }
        foreach($categories as $category){

        }
        if($catId !== null){
            
        }
        
        return $designs;
    }

    private function _find(){
        $categories = $this->_categoriesModel->findSports();

        $designs = $this->_formatArray($categories);

        return $designs;
    }
    private function _formatArray($categories){
        $return = [];
        foreach($categories as $category){
            if(count($category->children) > 0){
                $return = array_merge($return, $this->_formatArray($category->children));
                continue;
            }
            if($category->parent === 0){
                continue;
            }
            $return[] = $this->_mapping($category);
        }
        return $return;
    }
    private function _mapping($categoryModel){
        
        $design = new Design();

        $design->id = $categoryModel->id;
        $design->name = $categoryModel->name;
        $design->content = $categoryModel->content;
        $design->thumbnail = $categoryModel->picture;
        
        return $design;
    }
    /*   
//commente 
    public function findDesignsByTypes($typeId){
        return $this->_matchWithType($this->_findActive(), $typeId)
                ->distinct(["Designs.id"])
                ->toArray();
    }    
    public function findByGenders($types){

        $typeId = [];

        foreach($types as $v){
            $typeId[] = $v->id;
        }
        $query = $this->_matchWithType($this->_findNew(), $typeId);

        $query->group('Designs.id');

        $query->select($this);
        return $query->toArray();


    }

    public function findBySearchTerm($term){
        $query = $this->_findByTerm($term);

        return $query;
    }

    public function findTop(){

        $query = $this->_findTop();

        return $query->toArray();


    }
    
    private function _find(){
        
        $designs = $this->find('all')
                        ->order('Designs.priority');
        
        return $designs;
    }
    private function _findActive(){

        $designs = $this->_find()->where(["Designs.visible" => true]);
        
        return $designs;
    }
    private function _findNew(){

        $designs = $this->_findActive()->matching(
                            'Categories', function ($q) {
                        return $q->where(["Categories.id" => 2]);
                    });
        
        return $designs;
    }
    private function _findTop(){

//Better to use config
        $designs = $this->_findActive()->matching(
                            'Categories', function ($q) {
                        return $q->where(["Categories.id" => 2]);
                    });
        
        return $designs;
    }

    private function _matchWithType($query, $typeId){

        return $query->matching(
                            'Articles.Products.Types', function ($q) use ($typeId) {
                        return $q->where(["Types.id IN" => $typeId]);
                    }
                );
    }

    private function _findByTerm($term){
        $query = $this->_findActive()->where(
            ['OR' 
                => [
                    'Designs.name LIKE' => '%'.$term.'%',
                    'Designs.content LIKE' => '%'.$term.'%'
                ]
            ]
        );

        return $query;
    }
    public function addTags($query, $select = []){
        
        $query->contain([
            'Tags'
        ]);
        
    }
    public function addCategories($query, $select = []){
        
        $query->contain([
            'Categories' => function ($q) {
                return $q
                    ->where(['Categories.visible' => true])
                    ->contain(['Parent'])
                    ->order('Categories.priority');
             }
        ]);
        
    }*/
}

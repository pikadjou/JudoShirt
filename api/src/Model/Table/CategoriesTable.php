<?php
namespace App\Model\Table;

use App\Model\Entity\Category;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;


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

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->add('id', 'valid', ['rule' => 'numeric'])
            ->allowEmpty('id', 'create');
            
        $validator
            ->allowEmpty('name');
            
        $validator
            ->allowEmpty('content');

        return $validator;
    }
    
    /**
     * Default get all design by category id.
     *
     * @param 
     * @return App\Model\Table\DesignsTable
     */
    public function getAll()
    {
        $category = $this->find()->where(["visible" => 1])->order('visible');
        
        return $category;
    }
    
    public function getParents()
    {
        $category = $this->find()->where(["visible" => 1, "parent_id IS" => null]);
        
        return $category;
    }

    public function getChildren($parentId)
    {
        $category = $this->find()->where(["visible" => 1, "parent_id IS" => $parentId]);
        
        return $category;
    }
    /**
     * Default get all design by category id.
     *
     * @param 
     * @return App\Model\Table\DesignsTable
     */
    public function getOne($id)
    {
        $category = $this->find()->where(["id" => $id])->limit(1);
        
        return $category->first();
    }
    /**
     * Default get all design by category id.
     *
     * @param 
     * @return App\Model\Table\DesignsTable
     */
    public function getTop()
    {
        $design = $this->find()->where(["type" => 1])->limit(1);
        
        return $design;
    }
    
     /**
     * Default get all design by category id.
     *
     * @param 
     * @return App\Model\Table\DesignsTable
     */
    public function getNew()
    {
        $design = $this->find()->where(["type" => 2])->limit(1);
        
        return $design;
    }
    
     /**
     * Default get all design by category id.
     *
     * @param 
     * @return App\Model\Table\DesignsTable
     */
    public function getHome()
    {
        $design = $this->find()->where(["type" => 3])->limit(1);
        
        return $design;
    }
    
    /**
     * Default get all design by category id.
     *
     * @param 
     * @return App\Model\Table\DesignsTable
     */
    public function getPromotion()
    {
        $design = $this->find()->where(["type" => 4])->limit(1);
        
        return $design;
    }
    
    public function findByGenders($types){
        $typeId = [];

        foreach($types as $v){
            $typeId[] = $v->id;
        }
        $query = $this->_matchWithType($this->_findActive(), $typeId);

        $query->group('Designs.id');

        $query->select($this);

        return $query->toArray();
    }

    public function findWithDesigns(){

        $designTable = TableRegistry::get('Designs');

        $parent = $this->getParents()->toArray();

        foreach($parent as $category){
            $category['children'] = $this->getChildren($category->id)->toArray();

            foreach($category->children as $child){
                $child['design'] = $designTable->getAllById($child->id, false)->toArray();
            }
        }

        return $parent;
    }
    private function _find(){
        
        $categories = $this->find('all')->order('Categories.priority');
        
        return $categories;
    }
    private function _findActive(){
        
        $categories =  $this->_find()->where(["Categories.visible" => true]);
        
        return $categories;
    }

    
    private function _matchWithType($query, $typeIds){

        return $query->matching(
                        'Designs.Articles.Products.Types', function ($q) use ($typeIds) {
                    return $q->where(["Types.id IN" => $typeIds]);
                }
            );
    }

    private function _addDesign($query){
        
        $query->matching('Children.Designs', function(\Cake\ORM\Query $q) {
                return $q->where([
                    'Designs.visible' => true
                ]);
            });

            return $query;
    }

    private function _addChildren($query){
        
        $query->matching('Children', function(\Cake\ORM\Query $q) {

            return $q->matching('Designs', function(\Cake\ORM\Query $q) {
                return $q->where([
                    'Designs.visible' => true
                ]);
            })
            ->where([
                'Children.visible' => true
            ]);
        });

        return $query;
        
    }
    public function addChildren($query){
        
        $query->contain(['Children']);
        
    }
}

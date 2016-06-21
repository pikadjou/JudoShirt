<?php
namespace App\Model\Table;

use App\Model\Entity\Design;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Designs Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Categories
 * @property \Cake\ORM\Association\BelongsToMany $Tags
 */
class DesignsTable extends Table
{

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
            
        $validator
            ->allowEmpty('thumbnail');
            
        $validator
            ->allowEmpty('header');
            
        $validator
            ->allowEmpty('shopId');
            
        $validator
            ->allowEmpty('idCustomShop');

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
    /**
     * Default get all design by category id.
     *
     * @param integer $id (optional)
     * @return App\Model\Table\DesignsTable
     */
    public function getAllById($catId = null)
    {
        $designs = $this->getAll();

        if($catId !== null){
            $designs->matching('Categories', function(\Cake\ORM\Query $q) use ($catId) {
                return $q->where([
                    'Categories.id' => $catId
                ]);
            });
        }
        $this->addCategories($designs);
        
        return $designs;
    }
    
    
    /**
     * Make join
     */
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
        
    }
}

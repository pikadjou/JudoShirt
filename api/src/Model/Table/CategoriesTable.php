<?php
namespace App\Model\Table;

use App\Model\Entity\Category;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
class CategoriesTable extends Table
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
        $category = $this->find()->where(["visible" => 1]);
        
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
        
        return $category;
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
}

<?php
namespace App\Model\Table;

use App\Model\Entity\ProductColor;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * CategoriesDesigns Model
 *
 * @property \Cake\ORM\Association\BelongsTo $Product
 * @property \Cake\ORM\Association\BelongsTo $Color
 */
class ProductsAppearancesTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('products_appearances');
        $this->displayField('id');
        $this->primaryKey('id');
        $this->belongsTo('Products', [
            'foreignKey' => 'product_id'
        ]);
        $this->belongsTo('Appearances', [
            'foreignKey' => 'appearance_id'
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
            ->add('id', 'valid', ['rule' => 'numeric']);

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['product_id'], 'Products'));
        $rules->add($rules->existsIn(['appearance_id'], 'Appearances'));
        return $rules;
    }
    
    public function linkProductAndAppearanceId($productId, $appId){

        $join = $this->find()->where(["product_id" => $productId, "appearance_id" => $appId])->limit(1)->first();
        

        if(!$join){
            $join = $this->newEntity();
            
            $join->product_id = $productId;
            $join->appearance_id = $appId;
            
            $this->save($join);

        }
    }
}

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
class ProductsPrintsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('products_prints');
        $this->displayField('id');
        $this->primaryKey('id');
        $this->belongsTo('Products', [
            'foreignKey' => 'product_id'
        ]);
        $this->belongsTo('Prints', [
            'foreignKey' => 'print_id'
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
        $rules->add($rules->existsIn(['print_id'], 'Products'));
        $rules->add($rules->existsIn(['product_id'], 'Prints'));
        return $rules;
    }
}

<?php
namespace App\Model\Table;

use App\Model\Entity\Promotion;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Promotions Model
 *
 */
class PromotionsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('promotions');
        $this->displayField('name');
        $this->primaryKey('id');
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
            ->allowEmpty('image');
            
        $validator
            ->add('startDate', 'valid', ['rule' => 'date'])
            ->allowEmpty('startDate');
            
        $validator
            ->add('endDate', 'valid', ['rule' => 'date'])
            ->allowEmpty('endDate');

        return $validator;
    }
    
    public function getOne($id) {
        
        $promotion = $this->find()->where(["id" => $id])->limit(1);
        
        return $promotion;
    }
    
    public function getActive() {
        
        $date = date('Y-m-d');
        $promotions = $this->find()->where(["startDate <=" => $date, "endDate >=" => $date]);
        
        return $promotions;
    }
    
    public function getSlide() {
        
        $promotions = $this->getActive()->where(["slide" => true]);
        
        return $promotions;
    }
}

<?php
namespace App\Model\Table;

use App\Model\Entity\View;
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
class ViewsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('views');
        $this->displayField('name');
        $this->primaryKey('id');
        $this->belongsToMany('Products', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'size_id',
            'joinTable' => 'products_sizes'
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
            ->allowEmpty('id');
            
        $validator
            ->allowEmpty('name');
            

        return $validator;
    }
    public function getByShopId($shopId){
        return $this->find()->where(["shopId" => $shopId])->limit(1);
    }

    public function addByXML($XMLView){
    
        $shopId = (string)$XMLView->attributes()->id;
            
        $viewModel = $this->getByShopId($shopId)->first();

        if(!$viewModel){
            $viewModel = $this->newEntity();
        }
        
        $viewModel->name = (string)$XMLView->name;
        
        $viewModel->shopId = $shopId;

        $this->save($viewModel);
        return $viewModel;
    }
}

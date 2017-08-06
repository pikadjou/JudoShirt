<?php
namespace App\Model\Table;

use App\Model\Entity\Appearance;
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
class AppearancesTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('appearances');
        $this->displayField('name');
        $this->primaryKey('id');
        $this->belongsToMany('Products', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'appearance_id',
            'joinTable' => 'products_appearances'
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

    public function getByDesignId($designId){
        return $this->_matchWithDesign($this->_find(), $designId)->select($this)->toArray();
    }


    private function _find(){
        return $this->find();
    }

    private function _matchWithDesign($query, $designId){

        return $query->matching(
                    'Products.Articles.Designs', function ($q) use ($designId) {
                        return $q->where(["Designs.id" => $designId]);
                    }
                );
    }
    public function addAppearanceByXML($XMLappearance){
    
        
        $shopId = (string)$XMLappearance->attributes()->id;
        
        $appearanceModel = $this->getByShopId($shopId)->first();

        if(!$appearanceModel){
            $appearanceModel = $this->newEntity();
        }
        
        $appearanceModel->name = (string)$XMLappearance->name;
        $appearanceModel->color = (string)$XMLappearance->colors->color;
        $appearanceModel->thumbnail = (string)$XMLappearance->resources->resource->attributes('xlink', true);

        
        $appearanceModel->shopId = $shopId;

        $this->save($appearanceModel);
        return $appearanceModel;
    
    }
}

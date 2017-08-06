<?php
namespace App\Model\Table;

use App\Model\Entity\Measure;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
class MeasuresTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->entityClass('App\Model\Entity\Measure');
        
        $this->table('measures');
        $this->primaryKey('id');
       
       $this->belongsToMany('Products', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'measure_id',
            'joinTable' => 'products_sizes_measures'
        ]);
    }
    public function getNameValue($name, $value){
        return $this->find()->where(["name" => $name, "value" => $value])->limit(1);
    }
    public function addByXML($XMLMeasure){
    
        $name = (string)$XMLMeasure->name;
        $value = (string)$XMLMeasure->value;

        $measureEntity = $this->getNameValue($name, $value)->first();

        if(!$measureEntity){
            $measureEntity = $this->newEntity();
        }
        
        $measureEntity->name = $name;
        $measureEntity->value = $value;

        $this->save($measureEntity);
        return $measureEntity;
    
    }
}

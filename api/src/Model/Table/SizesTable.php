<?php
namespace App\Model\Table;

use App\Model\Entity\Size;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;



class SizesTable extends Table
{
    public function initialize(array $config)
    {
        
        $this->table('sizes');
        $this->primaryKey('id');
        $this->belongsToMany('Products', [
            'foreignKey' => 'product_id',
            'targetForeignKey' => 'size_id',
            'joinTable' => 'products_sizes'
        ]);
        
    }
    
    public function getByShopId($shopId){
        return $this->find()->where(["shopId" => $shopId])->limit(1);
    }

    public function addSizeByXML($XMLSize){
    
        $shopId = (string)$XMLSize->attributes()->id;
        
        $sizeEntity = $this->getByShopId($shopId)->first();

        if(!$sizeEntity){
            $sizeEntity = $this->newEntity();
        }
        
        $sizeEntity->name = (string)$XMLSize->name;           
        
        $sizeEntity->shopId = $shopId;

        $this->save($sizeEntity);
        return $sizeEntity;
    }
}

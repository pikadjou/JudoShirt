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



    public function mappingByAttribute($attributes){
        foreach($attributes as $attribute){
            if($attribute->name === "Color"){
                $attribute->options = property_exists ($attribute, "options") ? $attribute->options : [$attribute->option];
                return $this->_formatArray($attribute->options);
            }
        }
        return [];
    }
    protected function _formatArray($apps){
        
        $return = [];
        foreach($apps as $app){
            $return[] = $this->_mapping($app);
        }
        return $return;
    }
    private function _mapping($wooApp){
        $app = new Appearance();
        $app->id = $wooApp;
        $app->name = $wooApp;
        
        return $app;
    }
//old code
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

<?php
namespace App\Model\Table;

use App\Model\Entity\Tag;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;


/**
 * Tags Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
class TypesTable extends Table
{

    private $_manualClotheType = ["Tee shirt", "Sweat-shirt", "Veste", "Débardeur", "Coque", "Sac", "Casquette", "Mug", "Peluche"];
    private $_manualClotheMatch = [
        "T-shirt" => "Tee shirt",
        "Bag" => "Sac",
        "Nounours" => "Peluche"
    ];
    private $_manualType = ["Homme", "Femme", "Unisexe", "Enfant"];
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('types');
        $this->displayField('name');
        $this->primaryKey('id');
        $this->belongsToMany('Products', [
            'foreignKey' => 'type_id',
            'targetForeignKey' => 'product_id',
            'joinTable' => 'products_types'
        ]);
        
        $this->hasMany('ChildrenTypes', [
            'className' => 'types',
            'foreignKey' => 'parent_id',
            'dependent' => true,
        ]);
        $this->belongsTo('ParentTypes', [
            'className' => 'types',
            'foreignKey' => 'parent_id'
        ]);
    }
    
    public function getByShopId($id){
        return $this->_find()->where(["Types.shopId" => $id])->limit(1);
    }

    public function getByName($name){
        return $this->_find()->where(["Types.name" => $name])->limit(1);
    }
    public function getParentByName($name){
        return $this->_find()->where(["Types.name" => $name, "Types.parent_id IS" => null])->limit(1)->first();
    }
    public function getSubByName($name){
        return $this->_find()->where(["Types.name" => $name, "Types.parent_id IS NOT" => null])->limit(1)->first();
    }
    
    public function findMasterTypes(){
        return $this->_findType(1)
        ->where(["Types.parent_id IS" => null])
        ->contain(['ChildrenTypes'])
        ->toArray();
    }
    public function findAllChildren($typeId){
        return $this->_find()->where(["Types.parent_id" => $typeId])->toArray();
    }
    public function findTypes(){
        return $this->_findType(1)->toArray();
    }
    public function findGenders(){
        return $this->_findType(2)->toArray();
    }
    public function findExcludeTypeByDesign($desingId){
        $includeTypes = $this->_matchWithTypeDesign($this->_findType(1), $desingId)
        ->distinct("Types.id")->select($this)->toArray();
        
        $allTypes = $this->_findType(1)->where(["Types.parent_id IS NOT" => null])->toArray();
        
        $returnType = [];
        foreach($allTypes as $aType){
            $found = false;
            foreach($includeTypes as $iType){
                if($aType->id === $iType->id){
                    $found = true;
                    break;
                }
            }
            //debug($found);
            if($found === false){
                $returnType[] = $aType;
            }
        }

        return $returnType;
    }

    public function addTypesByXML($response){
                
        $fullName = (string)$response->name;
        $name = (string)$response->categoryName;

        foreach ($this->_manualClotheMatch as $key => $value){
            if(stripos($name, $key) !== false){
                $name = str_replace($key, $value, $name);
            }
        }

        $types = [];
        $type = $this->getSubByName($name);

        if(!$type){
            $type =  $this->newEntity();

            $parent = $this->getParentByName($name);
            if(!$parent){
                $parent =  $this->newEntity();
                $parent->name = $name;
                $parent->type = 1;
                $parent = $this->save($parent);
            }
        
            $type->parent_id = $parent->id;
        }
        $type->name = $name;
        $type->type = 1;

        $types[] = $this->save($type);
        
        
        /*
         * Check Homme/Femme/mixte
         */
        $find = false;
        for($i = 0, $l = count($this->_manualType); $i < $l; $i++){
            if(stripos($fullName, $this->_manualType[$i]) !== false){

                $type = $this->getByName($this->_manualType[$i])->first();

                if(!$type){
                   $type = $this->newEntity();
                }        
                $type->name = $this->_manualType[$i];
                $type->type = 2;

                $types[] = $this->save($type);

                $find = true;
                
                break;
            }
        }
         if(!$find){
                 
            $defaultName = "Autre";

            $type = $this->getByName($defaultName)->first();

            if(!$type){
               $type = $this->newEntity();
            }        
            $type->name = $defaultName;
            $type->type = 2;

            $types[] = $this->save($type);
        }
        
        return $types;   
    }
    

    public function findByGenders($types, $productModel){


        $products = $productModel->findByGenders($types);
        $productIds = [];

        foreach($products as $v){
            $productIds[] = $v->id;
        }

        $query = $this->_matchWithTypeProducts($this->_findType(1), $productIds);

        $query->group('Types.id');

        $query->select($this);

        return $query->toArray();

    }

    private function _find(){
        return $this->find()->order('Types.priority');
    }

    private function _findType($type){
        return $this->_find()->where(["Types.type" => $type]);
    }

    private function _matchWithTypeProducts($query, $productIds){

        return $query->matching(
                    'Products', function ($q) use ($productIds) {
                        return $q->where(["Products.id IN" => $productIds]);
                    }
                );
    }

    private function _matchWithTypeDesign($query, $designId){

        return $query->matching(
                    'Products.Articles.Designs', function ($q) use ($designId) {
                        return $q->where(["Designs.id" => $designId]);
                    }
                );
    }
}

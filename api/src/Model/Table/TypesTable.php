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

        return $validator;
    }
    
    public function getByShopId($id){
        return $this->find()->where(["Types.shopId" => $id])->limit(1);
    }

    public function getByName($name){
        return $this->find()->where(["Types.name" => $name])->limit(1);
    }
    
    public function findMasterProducts(){
        return $this->_findType(1)->where(["Types.parent_id IS" => null])->toArray();
    }
    public function findProducts(){
        return $this->_findType(1)->toArray();
    }
    public function findGenders(){
        return $this->_findType(2)->toArray();
    }

    private function _findType($type){
        return $this->find()->where(["Types.type" => $type]);
    } 
    public function addTypesForProduct($response){
                
        $fullName = (string)$response->name;
        $name = (string)$response->categoryName;

        debug($fullName);
        debug($name);

        foreach ($this->_manualClotheMatch as $key => $value){
            if(stripos($name, $key) !== false){
                $name = str_replace($key, $value, $name);
            }
        }

        $types = [];
        
        $type = $this->getByName($name)->first();
        
        if(!$type){
            $type =  $this->newEntity();
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

    private function _matchWithTypeProducts($query, $productIds){

        return $query->matching(
                    'Products', function ($q) use ($productIds) {
                        return $q->where(["Products.id IN" => $productIds]);
                    }
                );
    }
}

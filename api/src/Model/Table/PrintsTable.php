<?php
namespace App\Model\Table;

use App\Model\Entity\PrintType;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

use App\Model\SpreadShirt;
/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
require_once(ROOT . DS . 'vendor' . DS  . 'SpreadShirt' . DS . 'HttpRequest.php');

class PrintsTable extends Table
{

    protected $_spreadshirt = null;
    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->entityClass('App\Model\Entity\PrintType');
        
        $this->table('prints');
        $this->primaryKey('id');
       
        $this->_spreadshirt = new SpreadShirt\HttpRequest();
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

        return $validator;
    }
    
    private function getByShopIdNoCache($id){
        return $this->find()->where(["shopId" => $id])->limit(1);
    }
    
    public function getAllBySpreadShirt() {
        $url = $this->_spreadshirt->_urlShop . "/printTypes";
        
        $response = $this->_spreadshirt->getRequest($url) ;
        $response = simplexml_load_string($response);
        //debug($response);

        foreach ($response->printType as $print){

            $link = (string)$print->attributes('xlink', true); //->attributes()->href;
            $link .= "?locale=fr_FR";
            
            $response = $this->_spreadshirt->getRequest($link) ;
            $response = simplexml_load_string($response);
            
            //debug($response);
            $printId = (string)$response->attributes()->id;

            $printEntity = $this->getByShopIdNoCache($printId)->first();

            if(!$printEntity){
                $printEntity = $this->newEntity();
            }

            $printEntity->shopId = $printId;
            $printEntity->name = (string)$response->name;
            $printEntity->content = (string)$response->description;

            //debug($product);
            $this->save($printEntity);
        }
        
    }
    public function getAll(){
        
        $query = $this->find()->where(["visible" => 1]);
        
        return $query;
    }
}

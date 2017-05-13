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
    
    public function getOne($id) {
        
        $promotion = $this->find()->where(["id" => $id])->limit(1);
        
        return $promotion;
    }
    
    public function getActive() {
        
        $date = date('Y-m-d');
        $promotions = $this->find()->where(["startDate <=" => $date, "endDate >=" => $date, "visible" => true])->order('priority');
        
        return $promotions;
    }
    
    public function getSlide() {
        
        $promotions = $this->getActive()->where(["slide" => true]);
        
        return $promotions;
    }
    
    public function getBestByCode(){
        
        $query = $this->_findActive();
        $query = $this->_fillByCode($query);
        $query = $this->_byOrder($query);
        
        return $query->first();
    }
    
    private function _findActive() {
        
        $date = date('Y-m-d');
        $query = $this->find()->where(["startDate <=" => $date, "endDate >=" => $date, "visible" => true]);
        
        return $query;
    }
    
     private function _fillByCode($query) {
        
        $query = $query->where(["type" => "code"]);
        
        return $query;
    }
    
    private function _byOrder($query) {    
        return $query->order('priority');
    }
}

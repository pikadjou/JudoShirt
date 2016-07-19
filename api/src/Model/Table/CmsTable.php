<?php
namespace App\Model\Table;

use App\Model\Entity\Product;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;



class CmsTable extends Table
{    
    public function initialize(array $config)
    {
        
        $this->table('cms');
        $this->primaryKey('id');
        
    }
    
    public function getVisible(){
        
        $cms = $this->find()->where(["visible" => true]);

        return $cms;
    }
}

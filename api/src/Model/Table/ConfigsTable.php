<?php
namespace App\Model\Table;

use App\Model\Entity\Config;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Configs Model
 *
 */
class ConfigsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        $this->table('configs');
        $this->displayField('name');
        $this->primaryKey('id');
    }

    public function getFrontConfig(){
        return $this->_findActive()->where(["front" => true])->toArray();
    }

    private function _find(){
        return $this->find('all');
    }
    private function _findActive(){
        return $this->_find()->where(["Configs.visible" => true]);
    }
}

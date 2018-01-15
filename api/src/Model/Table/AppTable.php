<?php
namespace App\Model\Table;

use Cake\ORM\Table;

use Cake\Log\Log;

require_once(ROOT . DS . 'plugins' . DS  . 'WooCommerce' . DS . 'WooCommerce.php');
require_once(ROOT . DS . 'plugins' . DS  . 'Wordpress' . DS . 'WordpressApiClient.php');
require_once(ROOT . DS . 'plugins' . DS  . 'Printful' . DS . 'PrintfulApiClient.php');
require_once(ROOT . DS . 'plugins' . DS  . 'Cache' . DS . 'CacheModel.php');

class AppTable extends Table
{
    public function getNewModel()
    {
        return null;
    }
    protected function _formatArray($entities){

        $return = [];
        foreach($entities as $entity){
            $return[] = $this->_format($entity);
        }
        return $return;
    }
    protected function _format($entity){
        $model = $this->getNewModel();
        return $model->set($entity);
    }
    protected function _findAndMap($options = []){
        $entities = $this->_find($options);
        return $this->_formatArray($entities);
    }
}

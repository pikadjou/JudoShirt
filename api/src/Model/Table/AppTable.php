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
            $enti = $this->getNewModel();
            $return[] = $enti->set($entity);

            debug($enti);
        }

        debug($return);
        return $return;
    }
}

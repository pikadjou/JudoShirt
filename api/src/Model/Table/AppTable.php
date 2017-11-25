<?php
namespace App\Model\Table;

use Cake\ORM\Table;

use Cake\Log\Log;

require_once(ROOT . DS . 'plugins' . DS  . 'WooCommerce' . DS . 'WooCommerce.php');
require_once(ROOT . DS . 'plugins' . DS  . 'Printful' . DS . 'PrintfulApiClient.php');
require_once(ROOT . DS . 'plugins' . DS  . 'Cache' . DS . 'CacheModel.php');

class AppTable extends Table
{
    public function formatQueryResult($query){
        foreach($query as $k => $v){
            if($v["_matchingData"]){

                foreach($v["_matchingData"] as $key => $value){
                    $v[$key] = $value;
                }
            }
        }

        return $query;
    }
}

<?php
namespace App\Model\Table;

use Cake\ORM\Table;

use Cake\Log\Log;


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

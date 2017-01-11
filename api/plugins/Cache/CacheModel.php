<?php
namespace App\Model\Cache;

use Cake\Cache\Cache;
use Cake\Core\Configure;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class CacheModel
{
    public static $listKeyServeur = "CacheListKey";
    public static function write($key, $value, $config = 'default')
    {
        if(!Configure::read('CacheEnabled')){
            return false;
        }
        CacheModel::addKeyInList($key);
        return Cache::write($key, $value, $config);
    }
    
   public static function read($key, $config = 'default')
    {
        if(!Configure::read('CacheEnabled')){            
            CacheModel::delete($key, $config);
            return false;
        }
       $cache = Cache::read($key, $config);
       if($cache === false){
           CacheModel::delete($key, $config);
       }
       return $cache;
    }
    public static function delete($key, $config = 'default')
    {
        CacheModel::removeKeyInList($key);
        return Cache::delete($key, $config);
    }

    public static function getAllValues()
    {
        $list = Cache::read(CacheModel::$listKeyServeur);
        if($list === false || $list === null){
            return [];
        }
        $return = [];

        foreach($list as $value){
            $start = memory_get_usage(); 
            $return[$value] = Cache::read($value);
            $end = memory_get_usage();

            $return[$value]->__memory = CacheModel::convert($end -$start);
            
        }

        return $return;
    }

    public static function addKeyInList($key){

        $list = Cache::read(CacheModel::$listKeyServeur);
        if($list === false || $list === null){
            $list = [];
        }
        if(array_search($key, $list) != false){
            return;
        }
        array_push($list, $key);
        Cache::write(CacheModel::$listKeyServeur, $list);
    }
    public static function removeKeyInList($key){
        $list = Cache::read(CacheModel::$listKeyServeur);
        if($list === false || $list === null){
            return;
        }
        $index = array_search($key, $list);
        if($index === false){
            return;
        }

        unset($list[$index]);
        Cache::write(CacheModel::$listKeyServeur, $list);
        
    }

    public static function convert($size)
    {
        $unit=array('b','kb','mb','gb','tb','pb');
        return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
    }
}
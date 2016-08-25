<?php
namespace App\Model\Cache;

use Cake\Cache\Cache;
use Cake\Core\Configure;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class CacheController
{

    public static function write($key, $value, $config = 'default')
    {
        if(!Configure::read('CacheEnabled')){
            return false;
        }
        return Cache::write($key, $value, $config);
    }
    
   public static function read($key, $config = 'default')
    {
        if(!Configure::read('CacheEnabled')){
            Cache::delete($key, $config);
            return false;
        }
       return Cache::read($key, $config);
    }

}
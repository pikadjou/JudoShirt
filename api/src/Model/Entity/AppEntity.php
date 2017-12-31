<?php
namespace App\Model\Entity;

abstract class AppEntity
{
    function __construct() {   }

    public function set($entity){
        $props = get_object_vars($this);
        foreach($props as $prop => $v){
            if(array_key_exists($prop, $entity)){
                $type = gettype($this->$prop);
                if($type === 'object'){
                    $this->$prop->set($entity->$prop);
                }else{
                    $this->$prop = $entity->$prop;
                }
            }
        }
        return $this;
    }
}

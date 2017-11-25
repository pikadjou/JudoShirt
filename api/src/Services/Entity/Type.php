<?php

namespace App\Services\Entity;

class Type
{
    public $id = 0;
    public $name = "";
    public $content = "";
    public $type = 1;

    public $parent = null;
    public $children = [];


    public $desings = [];
    public $categories = [];
    public $secondTypes = []; 
    
    
    function __construct($type){

        $this->id = $type->id;
        $this->name = $type->name;
        $this->content = $type->content;
        //$this->type = $type->type;
/*
        if($type->desings){
            for($i = 0, $l = count($type->desings); $i < $l; $i++){
                $this->desings[] = new \App\Services\Entity\design($type->desings[$i]);
            }
        }

        if($type->categories){
            for($i = 0, $l = count($type->categories); $i < $l; $i++){
                $this->categories[] = new \App\Services\Entity\category($type->categories[$i]);
            }
        }

        if($type->secondTypes){
            for($i = 0, $l = count($type->secondTypes); $i < $l; $i++){
                $this->secondTypes[] = new \App\Services\Entity\type($type->secondTypes[$i]);
            }
        }
        
        if($type->parent_type){
            $this->parent = new \App\Services\Entity\type($type->parent_type);
        }
*/

        if($type->children){
            for($i = 0, $l = count($type->children); $i < $l; $i++){
                $this->children[] = new \App\Services\Entity\type($type->children[$i]);
            }
        }
    }

}

?>
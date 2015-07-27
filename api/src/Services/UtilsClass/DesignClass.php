<?php

namespace App\Services\Utils;

class ServiceDesign extends ServiceDesign
{
    public $id = 0;
    public $categories = [];

    public function setId(integer $id){
        $this->id = $id;
    }
}

?>
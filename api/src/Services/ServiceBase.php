<?php

namespace App\Services;

class ServiceBase
{
    public $id = 0;
    public $categories = [];

    public function setId(integer $id){
        $this->id = $id;
    }
}

?>
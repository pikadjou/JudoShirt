<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;


/**
 * Designs Controller
 *
 * @property \App\Model\Table\DesignsTable $Designs
 */
class DesignsController extends AdminAppController
{
    public function initialize()
    {
        $this->model = $this->Designs;
        
    }
    
}

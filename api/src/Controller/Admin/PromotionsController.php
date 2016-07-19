<?php
namespace App\Controller\Admin;

use App\Controller\Admin\AdminAppController;


/**
 * Promotions Controller
 *
 * @property \App\Model\Table\PromotionsTable $Promotions
 */
class PromotionsController extends AdminAppController
{

    public function initialize()
    {
        $this->model = $this->Promotions;
        
    }
    
}

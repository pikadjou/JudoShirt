<?php
namespace App\Model\Table;

use App\Model\Entity\Category;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

use App\Model\SpreadShirt;
require_once(ROOT . DS . 'vendor' . DS  . 'SpreadShirt' . DS . 'HttpRequest.php');
/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
class BasketsTable extends Table
{
    
    protected $_spreadshirt = null;

    public function initialize(array $config)
    {
        $this->table(false);
  
        $this->_spreadshirt = new SpreadShirt\HttpRequest();
    }

    public function create($token){
        $url = $this->_spreadshirt->_host . "baskets";

        $xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><basket xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://api.spreadshirt.net"></basket>';

        $basket = $this->_spreadshirt->postRequest($url, $xml);
        
        return $basket;
    }
    
    public function getOne($id){
        $url = $this->_spreadshirt->_host . "baskets/" . $id . "?locale=fr_FR";
        
        $basket = $this->_spreadshirt->getRequest($url);
        return $basket;
    }
    
    public function updateArticleQuantity($basketId, $id, $quantity, $element){
        
        $url = $this->_spreadshirt->_host . "baskets/" . $basketId ."/items/". $id;

        $xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
                . '<basketItem xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://api.spreadshirt.net" xlink:href="http://api.spreadshirt.net/api/v1/baskets/'.$basketId.'/items/'.$id.'" '
                . 'id="'.$id.'">'
                . '<quantity>'.$quantity.'</quantity>'
                . $element                
                . '</basketItem>';

        debug($xml);
        $reponse = $this->_spreadshirt->putRequest($url, $xml);
        
        return true;
    }
    
    public function deleteArticle($basketId, $id){
        
        $url = $this->_spreadshirt->_host . "baskets/" . $basketId ."/items/". $id;

        $reponse = $this->_spreadshirt->deleteRequest($url);
        debug($reponse);
        return true;
    }
}

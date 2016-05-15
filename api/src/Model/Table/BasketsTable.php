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
        $url = $this->_spreadshirt->_host . "baskets/" . $id;
        
        $basket = $this->_spreadshirt->getRequest($url);
        return $basket;
    }
    private function get_headers_from_curl_response($response)
    {
        $headers = array();

        $header_text = substr($response, 0, strpos($response, "\r\n\r\n"));

        foreach (explode("\r\n", $header_text) as $i => $line)
            if ($i === 0){
                $headers['http_code'] = $line;
            } else {
                list ($key, $value) = explode(': ', $line);

                $headers[$key] = $value;
            }

        return $headers;
    }
}

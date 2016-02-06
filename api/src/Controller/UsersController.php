<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\UsersRequestHandler;
use App\Services\Entity;

require_once(ROOT . DS . 'vendor' . DS  . 'SpreadShirt' . DS . 'HttpRequest.php');
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class UsersController extends AppController
{

    protected $_spreadshirt = null;
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        
        $this->_spreadshirt = new \App\Model\SpreadShirt\HttpRequest();
    }
    /**
     * Index method
     *
     * @return void
     */
    public function getLoginMethodes()
    {
        
        $url = $this->_spreadshirt->_securityHost . "sessions";

        //$url = $this->_spreadshirt->secureUrl("POST", $url);
        $xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><login xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://api.spreadshirt.net"><username>pikadjou@gmail.com</username><password>blacks-159</password></login>';
        
        $response = new UsersRequestHandler\GetLoginMethodesResponse();
        $response->init();
        
        $response->add(new \App\Services\Entity\LoginMethode("SpreadShirt", $url, "xml", $xml));

        parent::setJson($response);
    }

    public function login(){
        $url = $this->_spreadshirt->_securityHost . "sessions";

        //$url = $this->_spreadshirt->secureUrl("POST", $url);
        $xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><login xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://api.spreadshirt.net"><username>pikadjou@gmail.com</username><password>blacks-159</password></login>';
        
        $response = $this->_spreadshirt->postRequest($url, $xml);
        
        //debug($response);
        
        $headers = $this->get_headers_from_curl_response($response);
                debug($headers);

        header("Set-Cookie: sprd_auth_token=98962447-e5b9-45fd-ba4e-d94eef35634b; Path=/; Domain=.mangelavie.org; HttpOnly");
        
        parent::setJson(null);
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

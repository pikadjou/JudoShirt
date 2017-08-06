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
        
        if ($this->request->is('options')) {
            return $this->response;
        }
        $data = $this->request->data;
        $url = $this->_spreadshirt->_securityHost . "sessions";
        debug($url);
        debug($data);
        $xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><login xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://api.spreadshirt.net"><username>'.$data['username'].'</username><password>'.$data['password'].'</password></login>';
        debug($xml);
        $login = $this->_spreadshirt->postRequest($url, $xml); 
        debug($login);       
        $headers = $this->get_headers_from_curl_response($login);

        debug($headers);
        $response = new UsersRequestHandler\GetLoginResponse();
        if($headers['http_code'] && strpos($headers['http_code'], '201')){
            $response->init(true);
            
            if($headers['Set-Cookie']){
                $explode = explode(";", $headers['Set-Cookie']);
                
                if($explode[0]){
                    $cookie = explode("=", $explode[0]);
                    
                    $response->addCookie($cookie[0], $cookie[1]);
                    if($cookie[1]){
                        $idSession = $cookie[1];
                        
                        $user = $this->_getUserBySession($idSession);
                        
                        if($user){
                        $response->init(true);
                        
                        $response->addUser($user);
                        }
                    }
                }
                
            }
        }else{
            $response->init(false);

            $response->addCookie("erreur", $headers);
            
        }
        
        parent::setJson($response);
    }
    
    private function _getXmlUserBySession($sessionId){
        $url = $this->_spreadshirt->_securityHost . "sessions/" . $sessionId;

        $response = $this->_spreadshirt->getRequest($url, false);
        
        if(!$response){
            return false;
        }
        $response = simplexml_load_string($response);
        
        $userLink = (string)$response->user->attributes('xlink', true);
        
        $user = $this->_spreadshirt->getRequest($userLink);
        $user = simplexml_load_string($user);
        
        return $user;
    }
    private function _getUserBySession($sessionId){
        
        $user = $this->_getXmlUserBySession($sessionId);
        
        if(!$user){
            return false;
        }

        $userModel = new Entity\User();
        $userModel->initByXml($user);
        
        return $userModel;
    }
    
    public function session($id){
        
        $user = $this->_getUserBySession($id);
        
        $response = new UsersRequestHandler\GetSessionResponse();

        if($user == false){
            $response->init(false);
        }else{
            $response->init(true);
            
            $response->addUser($user);
            //continue traitement
        }

        parent::setJson($response);
    }
    
    public function details($sessionId){
        
        $response = $this->_getXmlUserBySession($sessionId);
        
        if(!$response){
            return false;
        }
        
        $addressesLink = (string)$response->printTypes->attributes('xlink', true);
        
        $addresses = $this->_spreadshirt->getRequest($addressesLink, true, $sessionId);
        debug($addresses);
        
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

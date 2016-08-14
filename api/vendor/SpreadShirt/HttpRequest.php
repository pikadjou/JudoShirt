<?php

namespace App\Model\SpreadShirt;

class HttpRequest{
    
    private $_secretKey = "baea0b0f-4e8c-4a53-95e4-56694e8c1937";
    private $_apiKey = "38dc47e4-550f-4d36-9f12-c25e6f754957";
    
    public $_host = "http://api.spreadshirt.net/api/v1/";
    public $_securityHost = "https://api.spreadshirt.net/api/v1/";
    public $_shopId = "100045684";
    public $_urlShop = "";
    
    function __construct() {
       // $this->_secretKey = Configure::read('SPREADSHIRT_API_SECRET');
       // $this->_apiKey = Configure::read('SPREADSHIRT_API_KEY');
        
        $this->_urlShop = $this->_host . "shops/" . $this->_shopId . "/";
    }
        
    public function getRequest($url, $secure = false, $sessionId = ""){
        
        $url = $this->encodeUrl($url);
        if($secure){
            $url = $this->secureUrl("GET", $url, $sessionId);
        }
        //
        // Open the Curl session
        $session = curl_init($url);
        
        // fix this security leak
        curl_setopt($session, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($session, CURLOPT_HTTPHEADER, $this->getRelevantRequestHeaders());
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($session, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($session, CURLOPT_SSL_VERIFYHOST, 2);
        $response = curl_exec($session);
        //header("Content-Type: application/xml");
        //header(getStatusMessage("".curl_getinfo($session, CURLINFO_HTTP_CODE)));
        
        curl_close($session);
        
        return $response;
    }
    
    public function postRequest($url, $data){
        
        $url = $this->encodeUrl($url);
        // Open the Curl session
       $this->secureUrl('POST', $url);
        
        $session = curl_init($this->secureUrl('POST', $url));
        curl_setopt($session, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($session, CURLOPT_POST, true);
        curl_setopt($session, CURLOPT_POSTFIELDS, $data);
        curl_setopt($session, CURLOPT_HTTPHEADER, $this->getRelevantRequestHeaders());
        curl_setopt($session, CURLOPT_HEADER, true);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        // Make the call
        $response = curl_exec($session);
        // The web service returns XML. Set the Content-Type appropriately
        //header("Content-Type: application/xml", true);
        //header("Location: " . parseHttpHeaders($response, "Location"), true);
        //header(getStatusMessage("".curl_getinfo($session, CURLINFO_HTTP_CODE)));
        
        curl_close($session);
        
        return $response;
    }
    
    public function putRequest($url, $data){
        $url = $this->encodeUrl($url);
        
        //if (strpos($url, 'image-server/v1') != 0 && strpos($data, 'xlink:href')) {           
        $session = curl_init($this->secureUrl('PUT', $url));         
        curl_setopt($session, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($session, CURLOPT_CUSTOMREQUEST, 'PUT');            
        curl_setopt($session, CURLOPT_POSTFIELDS, $data);            
        curl_setopt($session, CURLOPT_HTTPHEADER, array("Content-Type: text/xml"));
        curl_setopt($session, CURLOPT_HEADER, true);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        // Make the call
        $response = curl_exec($session);
        // The web service returns XML. Set the Content-Type appropriately
        //header(getStatusMessage("".curl_getinfo($session, CURLINFO_HTTP_CODE)));
        // curl_error($session);
        
        curl_close($session);
        return $response;
        
    }
    
    public function deleteRequest($url, $data){
        $url = $this->encodeUrl($url);
        
        //if (strpos($url, 'image-server/v1') != 0 && strpos($data, 'xlink:href')) {           
        $session = curl_init($this->secureUrl('DELETE', $url));         
        curl_setopt($session, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($session, CURLOPT_CUSTOMREQUEST, 'DELETE');
        curl_setopt($session, CURLOPT_HEADER, true);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        // Make the call
        $response = curl_exec($session);
        // The web service returns XML. Set the Content-Type appropriately
        //header(getStatusMessage("".curl_getinfo($session, CURLINFO_HTTP_CODE)));
        // curl_error($session);
        
        curl_close($session);
        return $response;
        
    }
    
    private function encodeUrl($url) {
        $newUrl = "";
        $params = preg_split('/[?&]/', $url);
        for ($i = 0; $i < sizeof($params); $i++) {
           if ($i == 0) {
              $newUrl .= $params[$i];
           } else if ($i == 1) {
              $newUrl .= "?";
              $keyvalue = preg_split('/=/', $params[$i]);
              $newUrl .= $keyvalue[0]."=".(sizeof($keyvalue) == 2 ? rawurlencode($keyvalue[1]) : "");
           } else if ($i > 1) {
              $newUrl .= "&";
              $keyvalue = preg_split('/=/', $params[$i]);
              $newUrl .= $keyvalue[0]."=".(sizeof($keyvalue) == 2 ? rawurlencode($keyvalue[1]) : "");
           }
        }
        return $newUrl;
    }
    public function secureUrl($method, $url, $sessionId = "") {
        $timestamp = time()*1000;
        $signature=sha1($method." ".$url." ".$timestamp." ".$this->_secretKey);
        $url.="?apiKey=".$this->_apiKey."&sig=".$signature."&time=".$timestamp;
        if($sessionId !== ""){
            $url.="=&sessionId=$sessionId";
        }
        return $url;
    }
    
    private function getRelevantRequestHeaders() {
        $headers = $this->getRequestHeaders();
        $relevantHeaders = array();
        foreach ($headers as $header => $value) {
            if ($header == "X-Authorization") {
                $relevantHeaders[] = "Authorization: " . rawurldecode($value);
            }
            else if ($header == "User-Agent" || $header == "Accept" || $header == "Accept-Language" ||
                    $header == "Accept-Charset" || $header == "Content-Type") {
                $relevantHeaders[] = $header. ": " . $value;
            }
        // || $header == "Accept-Encoding"
        }
        return $relevantHeaders;
    }
    private function getRequestHeaders() {
        $headers = array();
        foreach($_SERVER as $key => $value) {
            //echo str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))." ".$value."\n";
            if(strpos($key, 'HTTP_') === 0) {
                $headers[str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

?>
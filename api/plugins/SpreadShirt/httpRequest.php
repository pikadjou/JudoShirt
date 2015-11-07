<?php

namespace App\Model\SpreadShirt;

class HttpRequest{
    
    private $_secretKey = "";
    private $_apiKey = "";
    
    public $_urlShop = "";
    
    function __construct() {
        $this->_secretKey = Configure::read('SPREADSHIRT_API_SECRET');
        $this->_apiKey = Configure::read('SPREADSHIRT_API_KEY');
        
        $this->_urlShop = Configure::read('SPREADSHIRT_HOST') + "shops/" + Configure::read('SPREADSHIRT_SHOP_ID'); + "/";
    }
        
    public function getRequest($url){
        
        $url = $this->encodeUrl($url);
        //$url = $this->secureUrl("GET", $url);
        
        // Open the Curl session
        $session = curl_init($url);
        // fix this security leak
        curl_setopt($session, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($session, CURLOPT_HTTPHEADER, getRelevantRequestHeaders());
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
        $session = curl_init(secureUrl('POST', $url));
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
        $session = curl_init(secureUrl('PUT', $url));         
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
    private function secureUrl($method, $url) {
        $timestamp = time()*1000;
        $signature=sha1($method." ".$url." ".$timestamp." ".$this->_secretKey);
        $url.="?apiKey=".$this->_apiKey."&sig=".$signature."&time=".$timestamp;
        return $url;
    }
    
    private function getRelevantRequestHeaders() {
        $headers = getRequestHeaders();
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
<?php
namespace App\Model\Table;

use App\Error;

use App\Model\Entity\Client;
use App\Model\Wordpress;
use App\Model\WooCommerce;

class ClientsTable extends AppTable
{
    public function GetActiveUser($token){
        $wp = Wordpress\WordpressApiClient::getInstance();

        $data = $wp->get("wp/v2/users/me", $token);
        $data = json_decode($data);

        if(property_exists ($data, 'code')){
            $client = null;
        }else{
            $client = new Client();
            $client->set($data, $token);
        }

        return $client;

    }
    public function GetUserByCredential($login, $psd){
        $wp = Wordpress\WordpressApiClient::getInstance();
        $post = ["username" => $login, "password" => $psd];
        $data = $wp->post("simple-jwt-authentication/v1/token", $post);

        $data = json_decode($data);

        if(property_exists ($data, 'code')){
            return $data->code;
        }
        $client = $this->GetActiveUser($data->token);

        return $client;

    }
    public function CreateUser($info){

        $error = [];
        if(!array_key_exists ("username", $info)){
            $error[] = "username";
        }
        if(!array_key_exists ("email", $info)){
            $error[] = "email";
        }
        if(!array_key_exists ("password", $info)){
            $error[] = "password";
        }

        if(count($error)){
            throw new Error\Client\MissingParamsError("test1");
        }

        $admin = $this->GetUserByCredential("CreateUser", "gtF#m)Q0T%SpTW6O)T5N#g7");

        $wp = Wordpress\WordpressApiClient::getInstance();
        $data = $wp->post("wp/v2/users",$info, $admin->token);
        $data = json_decode($data);

        if(property_exists ($data, 'code')){
            throw new Error\Client\NotClientError($data->code);
        }

        $client = $this->GetUserByCredential($info["username"], $info["password"]);

        return $client;
    }

    public function RecoveryPassword($login){
        $wp = Wordpress\WordpressApiClient::getInstance();
        $data = $wp->get("enigma/user/retrieve_password/?user_login=$login");
        $data = json_decode($data);
        
        if($data->status != "ok"){
            throw new \Exception("error");
        }
        return true;
    }
    
    public function GetInfo($token){

        $client = $this->GetActiveUser($token);

        if($client->id){
            $data = $this->_getClientInfo($client->id);
            $client->set($data);
            return $client;
        }
        return null;
    }

    private function _getClientInfo($id){
        $woo = WooCommerce\WooCommerce::getInstance();

        $woo->get("customers/$id");

        return json_decode($woo->http->getResponse()->getBody());
    }
}

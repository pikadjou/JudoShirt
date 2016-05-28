<?php
namespace App\Controller;

use Cake\Network\Email\Email;
use App\Controller\AppController;

use App\Services\HelpRequestHandler;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class HelpController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        
        //$this->render('index');
    }
    
    public function contact() {
        
        $request = new HelpRequestHandler\SendContactRequest();
        $request->init($this->request->data);
        
        $code = 0;
        $message = "";
        try {
           $email = new Email('default');
           
           $email->from([$request->mail => $request->name . " " . $request->nickname])
                ->to(["pikadjou@gmail.com" => "MartialShirt"])
                ->subject("Contact - J'ai une question - MartialShirt")
                ->send($request->message);
           
           $code = 0;
           $message = "Merci, nous traitons votre demande dans les plus bref delais";
        } catch (Exception $e) {
            $code = 1;
           $message = "Aie une erreur c'est produite, si l'erreur persiste n'hésité pas a nous contact par mail directement: pikadjou[at]gmail.com";

        }
        
        $response = new HelpRequestHandler\SendContactResponse();
        $response->init($code, $message);

        parent::setJson($response);
    }
}

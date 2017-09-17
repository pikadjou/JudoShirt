<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link      http://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   http://www.opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Core\Configure;
use Cake\Event\Event;

use Cake\Log\Log;
/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link http://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
require_once(ROOT . DS . 'plugins' . DS  . 'Cache' . DS . 'CacheModel.php');

class AppController extends Controller
{

    /**
     * Initialization hook method.
     *
     * Use this method to add common initialization code like loading components.
     *
     * @return void
     */

     public $components = [
        'Acl' => [
            'className' => 'Acl.Acl'
        ]
    ];

    

    public function initialize()
    {
        parent::initialize();

        $this->loadComponent('Auth', [
            'authorize' => [
                'Acl.Actions' => ['actionPath' => 'controllers/']
            ],
            'loginAction' => [
                'plugin' => false,
                'controller' => 'Users',
                'action' => 'login',
                'prefix' => 'admin'
            ],
            'loginRedirect' => [
                'plugin' => false,
                'controller' => 'Posts',
                'action' => 'index',
                'prefix' => 'admin'
            ],
            'logoutRedirect' => [
                'plugin' => false,
                'controller' => 'Users',
                'action' => 'login',
                'prefix' => 'admin'
            ],
            'unauthorizedRedirect' => [
                'controller' => 'Users',
                'action' => 'login',
                'prefix' => 'admin'
            ],
            'authError' => 'You are not authorized to access that location.',
            'flash' => [
                'element' => 'error'
            ]
        ]);
       // $this->viewBuilder()->layout('empty');*/
        if(Configure::read('DebugView')){
            $this->render('/index');  
       }
    }
    
    function beforeFilter(Event $event = null) {
        parent::beforeFilter($event);
        if(!isset($this->request->params['prefix'])){
            $this->Auth->allow();
        }else if (isset($this->request->params['prefix']) && $this->request->params['prefix'] == 'admin') {
            $this->viewBuilder()->layout('admin');
//            $this->layout = 'admin';
        }
    }

    public function setJson($content){

        if($content === null){
            $this->set('_serialize', []);
            return;
        }

        //ob_start('ob_gzhandler');
        
        $classe = get_class($content);
        $explode = explode("\\", $classe);
        
        $name = $explode[count($explode) - 1];
        
        $this->set('Identifier', $name); 
        $this->set('Content', $content);
        $this->set('_serialize', ['Identifier', 'Content']);

        if(Configure::read('DebugView')){
            debug($content);
        }
        Log::info("request send: $name \n
                   content : ". json_encode($content) ."\n");

      /*while (ob_get_level() > 0) {
            ob_end_flush();
        }*/
    }
}
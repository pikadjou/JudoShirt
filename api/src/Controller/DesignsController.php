<?php
namespace App\Controller;

use App\Controller\AppController;
use App\Services\DesignsRequestHandler;

/**
 * Designs Controller
 *
 * @property \App\Model\Table\DesignsTable $Designs
 */
class DesignsController extends AppController
{

    public function initialize()
    {
        parent::initialize();
       $this->loadComponent('RequestHandler');
       
       
       $this->loadModel("Categories");
    }
    
    /**
     * Index method
     *
     * @return void
     */
    public function getDesign($id)
    {
        $query = $this->Designs->getOne($id);
 
        $query->contain([
            'Categories'
        ]);
        $query->contain([
            'Tags'
        ]);
        
        $design = $query->first();
        
        $response = new DesignsRequestHandler\GetDesignResponse();
        $response->init($design);
        
        parent::setJson($response);
    }
    /**
     * Index method
     *
     * @return void
     */
    public function getDesigns($catId = null)
    {
        if($catId === null){
            $query = $this->Designs->getAll();
        }else{
            $query = $this->Designs->getAllById($catId);
        }
        $query->contain([
            'Categories'
        ]);
        $query->contain([
            'Tags'
        ]);
        
        $designs = $query->toArray();
        
        $category = null;
        if($catId !== null){
            $category = $this->Categories->getOne($catId)->first();    
        }
        
        $response = new DesignsRequestHandler\GetDesignsResponse();
        $response->init($designs, $category);
        
        parent::setJson($response);
    }

    /**
     * Index method
     *
     * @return void
     */
    public function getInformationDesign($id)
    {
        $query = $this->Designs->getOne($id);
        
        $query->contain([
            'Categories'
        ]);
        $query->contain([
            'Tags'
        ]);
        
        $design = $query->first();
        
        
        $response = new DesignsRequestHandler\GetInformationDesignResponse();
        $response->init($design);
        
        parent::setJson($response);
    }
    
    
    public function getTopDesigns($limit = null, $tags = true)
    {
        $category = $this->Categories->getTop()->first(); 
        
        $designs = [];
        if($category){
            $query = $this->Designs->getAllById($category->id);
            
            if($limit){
                $query->limit($limit);
            }
            if($tags){
                $this->Designs->addTags($query);
            }
            
            $designs = $query->toArray();
        }
        
        $response = new DesignsRequestHandler\GetTopDesignsResponse();
        $response->init($designs, $category);
        
        parent::setJson($response);
    }
    
    public function getNewDesigns($limit = null, $tags = true)
    {
        $category = $this->Categories->getNew()->first(); 
        
        $designs = [];
        if($category){
            $query = $this->Designs->getAllById($category->id);
            
            if($limit){
                $query->limit($limit);
            }
            if($tags){
                $this->Designs->addTags($query);
            }
            $this->Designs->addCategories($query);
            
            $designs = $query->toArray();
        }
        
        $response = new DesignsRequestHandler\GetNewDesignsResponse();
        $response->init($designs, $category);
        
        parent::setJson($response);
    }
    
    public function getPromoDesigns($limit = null, $tags = true)
    {
        $category = $this->Categories->getPromotion()->first(); 
        
        $designs = [];
        if($category){
            $query = $this->Designs->getAllById($category->id);
            
            if($limit){
                $query->limit($limit);
            }
            if($tags){
                $this->Designs->addTags($query);
            }
            
            $designs = $query->toArray();
        }
        
        $response = new DesignsRequestHandler\GetPromotionDesignsResponse();
        $response->init($designs, $category);
        
        parent::setJson($response);
    }
    
    public function getFeaturedDesigns()
    {
        $category = $this->Categories->getHome()->first(); 
        
        $designs = [];
        if($category){
            $query = $this->Designs->getAllById($category->id);
            
            $designs = $query->toArray();
        }
        
        $response = new DesignsRequestHandler\GetFeaturedDesignsResponse();
        $response->init($designs, $category);
        
        parent::setJson($response);
    }
}

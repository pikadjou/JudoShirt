<?php
namespace App\Controller;

use App\Model\Cache;

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
        /*$query = $this->Designs->getOne($id);
 
        $query->contain([
            'Products.Colors'
        ]);
        
        $design = $query->first();
        */
        $response = new DesignsRequestHandler\GetDesignResponse();
       // $response->init($design);
        
        parent::setJson($response);
    }
    /**
     * Index method
     *
     * @return void
     */
    public function getDesigns($catId = null)
    {
        $key = "DesignsController-getDesigns-".$catId;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        
        $designs = $this->Designs->getAllById($catId);
        /*
        $query->contain([
            'Categories'
        ]);
        $query->contain([
            'Tags'
        ]);
        $query->contain([
            'Products.Colors'
        ]);
*/
$category = null;
        
        $response = new DesignsRequestHandler\GetDesignsResponse();
        $response->init($designs, $category);
        
        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }

    public function getDesignsByTypes($typeId = null)
    {
        $key = "DesignsController-getDesignsByTypes-".$typeId;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $this->loadModel("Types");
        $types = $this->Types->findAllChildren($typeId);

        $typeIds = [$typeId];
        foreach($types as $type){
            $typeIds[] = $type->id;
        }

        $designs = $this->Designs->findDesignsByTypes($typeIds);
        
        $response = new DesignsRequestHandler\GetDesignsResponse();
        $response->init($designs, null);
        
        Cache\CacheModel::write($key, $response);
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
        $query->contain([
            'Products.Colors'
        ]);

        $design = $query->first();
        
        
        $response = new DesignsRequestHandler\GetInformationDesignResponse();
        $response->init($design);
        
        parent::setJson($response);
    }
    
    
    public function getTopDesigns()
    {
        $key = "DesignsController-getTopDesigns-".$limit."-".$tags;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $category = $this->Categories->getTop()->first(); 
        
        $designs = [];
        if($category){
            $query = $this->Designs->getAllById($category->id);
            
            
            $designs = $query->toArray();

            debug($designs);
        }
        
        $response = new DesignsRequestHandler\GetTopDesignsResponse();
        $response->init($designs, $category);
        
        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }
    
    public function getNewDesigns($limit = null, $tags = true)
    {
        $key = "DesignsController-getNewDesigns-".$limit."-".$tags;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
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
        
        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }
    
    public function getPromoDesigns($limit = null, $tags = true)
    {
        $key = "DesignsController-getPromoDesigns-".$limit."-".$tags;
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        
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
/*
            $this->loadModel("Appearances");
            foreach($designs as $design){
                $design['appearances'] = $this->Appearances->getByDesignId($design->id);
            }
            */
        }
        
        $response = new DesignsRequestHandler\GetPromotionDesignsResponse();
        $response->init($designs, $category);
        
        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }
    
    public function getFeaturedDesigns()
    {
        $key = "DesignsController-getFeaturedDesigns";
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }
        $category = $this->Categories->getHome()->first(); 
        
        $designs = [];
        if($category){
            $query = $this->Designs->getAllById($category->id);
            
            $designs = $query->toArray();
        }
        
        $response = new DesignsRequestHandler\GetFeaturedDesignsResponse();
        $response->init($designs, $category);
        
        Cache\CacheModel::write($key, $response);
        parent::setJson($response);
    }
}

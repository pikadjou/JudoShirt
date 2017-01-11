<?php
namespace App\Controller;

use App\Model\Cache;

use App\Controller\AppController;
use App\Services\TypesRequestHandler;
/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class TypesController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function getMasterTypes()
    {
    	$key = "TypesController-getMasterTypes";
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }

        $types = $this->Types->findMasterTypes();

        $response = new TypesRequestHandler\GetMasterTypesResponse();
        $response->init($types);
        Cache\CacheModel::write($key, $response);

        parent::setJson($response);
    }

    public function getExcludeTypes($designId)
    {
    	$key = "TypesController-getExcludeType-$designId";
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }

        $types = $this->Types->findExcludeTypeByDesign($designId);
        $response = new TypesRequestHandler\GetExcludeTypesResponse();
        $response->init($types);

        Cache\CacheModel::write($key, $response);

        parent::setJson($response);
    }

	public function getProducts()
    {
    	$key = "TypesController-getProducts";
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }

        $types = $this->Types->findProducts();
        $response = new TypesRequestHandler\GetMasterProductsResponse();
        $response->init($types);
        Cache\CacheModel::write($key, $response);

        parent::setJson($response);
    }

    public function getGenders($full = true)
    {
    	$key = "TypesController-getGenders-".($full)? '1' : '0';
        if (($response = Cache\CacheModel::read($key)) !== false) {
            parent::setJson($response);
            return;
        }

        $types = $this->Types->findGenders();
        
        if((integer)$full === 1 || (boolean)$full === true){

            $this->loadModel("Designs");
            $this->loadModel("Categories");
            $productModel = $this->loadModel("Products");

            foreach($types as $type){

                $type->designs = $this->Designs->findByGenders($types);

                $type->categories = $this->Categories->findByGenders($types);

                $type->secondTypes = $this->Types->findByGenders($types, $productModel);

            }
            
        }

        $response = new TypesRequestHandler\GetGendersResponse();
        $response->init($types);
        Cache\CacheModel::write($key, $response);

        parent::setJson($response);
    }
}

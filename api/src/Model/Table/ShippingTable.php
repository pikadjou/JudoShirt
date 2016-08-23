<?php
namespace App\Model\Table;

use Cake\ORM\Table;

use App\Model\Entity\Country;
use App\Model\Entity\RegionCost;
use App\Model\Entity\RangeCost;

use App\Model\SpreadShirt;
/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
require_once(ROOT . DS . 'vendor' . DS  . 'SpreadShirt' . DS . 'HttpRequest.php');
/**
 * Categories Model
 *
 * @property \Cake\ORM\Association\BelongsToMany $Designs
 */
class ShippingTable extends Table
{
    protected $_spreadshirt = null;

    public function initialize(array $config)
    {
        $this->table(false);
        
        $this->_spreadshirt = new SpreadShirt\HttpRequest();
    }
    
    public function getAllCountry(){
        
        $url = $this->_spreadshirt->_urlShop . "/shippingTypes/1?locale=fr_FR";

        $response = $this->_spreadshirt->getRequest($url) ;
        $response = simplexml_load_string($response);
        //debug($response);
        $countryList = [];
        
        foreach ($response->shippingCountries->shippingCountry as $country){
                
            $countryEntity = new Country();
            
            $countryEntity->name = (string)$country->name;
            $countryEntity->iso = (string)$country->isoCode;
                    
            $countryEntity->regionCost = $this->getShippingRegion($response, (int)$country->shippingRegion->attributes()->id);


            $countryList[] = $countryEntity;
        }
        
        return $countryList;
    }

    public function getShippingRegion($response, $regionId){
        
        foreach ($response->shippingRegions->shippingRegion as $region){
                
            $id = (int)$region->attributes()->id;
            
            if($id != $regionId){
                continue;
            }
            $regionEntity = new RegionCost();
            
            $regionEntity->id = $id;
            $regionEntity->rangeCost = $this->getShippingRegionRange($region);

            return $regionEntity;
        }
        
    }
    
    public function getShippingRegionRange($response){
          
        $ranges = [];
        foreach ($response->shippingCosts->shippingCost as $cost){
                
            $rangeEntity = new RangeCost();
            
            $rangeEntity->rangeDown = (float)$cost->orderValueRange->from;
            $rangeEntity->rangeUp = (float)$cost->orderValueRange->to;
            if($rangeEntity->rangeDown == 0 && $rangeEntity->rangeUp == 0.01){
                continue;
            }
            $rangeEntity->price = (float)$cost->cost->vatIncluded;

            $ranges[] = $rangeEntity;
        }
        
        return $ranges;
    }
}

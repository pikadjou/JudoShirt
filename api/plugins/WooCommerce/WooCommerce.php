<?php
namespace App\Model\WooCommerce;

use Automattic\WooCommerce\Client;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 */
class WooCommerce
{
    private static $_instance = null;

    public static function getInstance()
    {
        if(Self::$_instance === null){
            Self::$_instance = new Client(
                'http://printful.mangelavie.org/printful/',
                'ck_0c84c8e2050660718b7650a12678f16ae15f5e48', 
                'cs_387bc9f8fa9c877e7079a835a0cfdcccc637d117',
                [
                    'wp_api' => true, // Enable the WP REST API integration
                    'version' => 'wc/v2',
                    'verify_ssl' => false,
                    'query_string_auth' => true
                ]
            );
        }
        return Self::$_instance;
    }
}
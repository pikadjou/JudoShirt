<?php

namespace App\Model\Printful\Exceptions;

use App\Model\Printful\Exceptions\PrintfulException;
require_once(ROOT . DS . 'plugins' . DS  . 'Printful' . DS . 'Exceptions' . DS . 'PrintfulApiException.php');

/**
 * Printful exception returned from the API
 */
class PrintfulApiException extends PrintfulException
{
}
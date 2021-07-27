<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Noticia;
use App\Utils\Elastic;

/**
 * @group Noticias
 */
class NoticiasElasticController extends Controller
{
    private $index = 'noticias';
    private $type  = 'registros';

    /**
     * Noticias Elastic
     */
    public function elasticAll()
    {
        $result = Elastic::all($this->index, $this->type);
        return $result;
    }

    /**
     * Noticias Elastic (id)
     *
     * @urlParam id required ID da Noticia. Example: 1
     *
     * @param  int  $id
     */
    public function elasticId($id)
    {
        $result = Elastic::id($this->index, $this->type, $id);
        return $result;
    }

    /**
     * Noticias Elastic All
     *
     * @urlParam id required ID da Noticia. Example: 1
     *
     * @param  int  $id
     */
    public function elasticDelete($id)
    {
        $result = Elastic::delete($this->index, $this->type, $id);
        return $result;
    }

}

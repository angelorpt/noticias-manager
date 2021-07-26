<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Utils\Elastic;

class Noticia extends Model
{
    use HasFactory;

    protected $table    = 'noticias';
    protected $fillable = [  'titulo'
                            ,'subtitulo'
                            ,'fonte'
                            ,'url'
                            ,'description'
                            ,'data_publicacao'];

    public function sendToElastic() {
        Elastic::send('noticias', 'registros', $this);
    }

}

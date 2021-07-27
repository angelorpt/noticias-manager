<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\NoticiasController;
use App\Http\Controllers\NoticiasElasticController;

// Route::get('/', function () {
//     return response()->json(['ok'=>'funcionando'], 200);
// });

Route::get     ('noticias/elastic'     , [NoticiasElasticController::class, 'elasticAll']);
Route::get     ('noticias/elastic/{id}', [NoticiasElasticController::class, 'elasticId']);
Route::delete  ('noticias/elastic/{id}', [NoticiasElasticController::class, 'elasticDelete']);

Route::post    ('noticias/lote'        , [NoticiasController::class, 'storeMany']);
Route::resource('noticias'             ,  NoticiasController::class);

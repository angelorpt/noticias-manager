<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\NoticiasController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/', function () {
//     $result = [
//         'success' => true,
//         'message' => 'message'
//     ];
//     return response()->json($result, 200);
// });

Route::resource('noticias'     ,  NoticiasController::class);
Route::post    ('noticias/lote', [NoticiasController::class, 'storeMany']);

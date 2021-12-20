<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::group([
    'middleware' => 'api',
    'prefix' => '/'

], function ($router) {
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
      Route::get('/getusers', [App\Http\Controllers\UserController::class, 'index']);
   Route::get('/getuser/{id}', [App\Http\Controllers\UserController::class, 'get']);
    Route::post('/update', [App\Http\Controllers\UserController::class, 'update']);
     Route::delete('/delete/{id}', [App\Http\Controllers\UserController::class, 'destroy']);
  Route::post('/createproduct', [App\Http\Controllers\ProductController::class, 'create']);
      Route::get('/getproducts', [App\Http\Controllers\ProductController::class, 'index']);
   Route::get('/getproduct/{id}', [App\Http\Controllers\ProductController::class, 'get']);
    Route::post('/updateproduct', [App\Http\Controllers\ProductController::class, 'update']);
     Route::delete('/deleteproduct/{id}', [App\Http\Controllers\ProductController::class, 'destroy']);
  Route::post('/addtowallet', [App\Http\Controllers\WalletController::class, 'add']);
  Route::post('/withdraw', [App\Http\Controllers\WalletController::class, 'withdraw']);
      Route::get('/getwalletbalance', [App\Http\Controllers\WalletController::class, 'get']);
      Route::post('/cart/add', [App\Http\Controllers\CartController::class, 'Add']);
  Route::post('/cart/update', [App\Http\Controllers\CartController::class, 'update']);
  Route::delete('/cart/remove/{id}', [App\Http\Controllers\CartController::class, 'destroy']);
  Route::get('/cart', [App\Http\Controllers\CartController::class, 'get']);
   Route::post('/placeorder', [App\Http\Controllers\OrderController::class, 'create']);
 Route::get('/getorders', [App\Http\Controllers\OrderController::class, 'index']);
 Route::get('/getmyorders', [App\Http\Controllers\OrderController::class, 'getmyindex']);
   Route::get('/getorder/{id}', [App\Http\Controllers\OrderController::class, 'get']);
 Route::post('/changestatus', [App\Http\Controllers\OrderController::class, 'changestatus']);
 Route::delete('/deleteorder/{id}', [App\Http\Controllers\OrderController::class, 'destroy']);
 Route::post('/changestatusself', [App\Http\Controllers\OrderController::class, 'changestatusself']);
   
});


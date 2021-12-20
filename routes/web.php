<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/{path?}', [
    'uses' => '\App\Http\Controllers\Controller@show',
    'as' => 'react',
    'where' => ['path' => '.*']
]);
Route::group(['middleware' => ['auth.role']], function () {
    Route::get('/admin', [App\Http\Controllers\Controller::class, 'admin'])->name('admin');
});
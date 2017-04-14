<?php

use Illuminate\Http\Request;

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

Route::get('/todos', function (Request $request) {
    return \App\Todo::paginate();
});

Route::post('/todos', function (Request $request) {
    return \App\Todo::create($request->only('task'));
});

Route::delete('/todos/{todo}', function (Request $request, \App\Todo $todo) {
    $todo->delete();
    return $todo;
});

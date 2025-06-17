<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\DirectAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->middleware(DirectAdmin::class);

Route::get('/midtrans-test', function() {
    return response()->json([
        'status' => 'ok',
        'message' => 'Endpoint dapat diakses',
        'time' => now()
    ]);
});
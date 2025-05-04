<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\AktivasiEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::get('/activate/{token}', [AuthController::class, 'activate']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    //untuk fitur yang harus login dulu tambah routenya disini guys
});
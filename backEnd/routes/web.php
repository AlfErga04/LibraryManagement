<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\DirectAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->middleware(DirectAdmin::class);


// Route::get('/activate/{token}', [AuthController::class, 'activate'])->name('activate');


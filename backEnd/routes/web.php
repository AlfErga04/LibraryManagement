<?php

use App\Http\Middleware\DirectAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->middleware(DirectAdmin::class);

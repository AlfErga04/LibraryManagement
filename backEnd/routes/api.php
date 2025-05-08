<?php

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Middleware\Pengembalian;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AktivasiEmail;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\PengembalianController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::get('/activate/{token}', [AuthController::class, 'activate']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/', [BookController::class, 'index']);
Route::get('/book/{id}', [BookController::class, 'detailBuku']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/pinjam', [PeminjamanController::class, 'store']);
    Route::post('/pengembalian/{peminjaman_id}', [PengembalianController::class, 'store'])->middleware([Pengembalian::class]);
    Route::get('/peminjaman/riwayat', [PeminjamanController::class, 'riwayatUser']);
    //untuk fitur yang harus login dulu tambah routenya disini guys

});
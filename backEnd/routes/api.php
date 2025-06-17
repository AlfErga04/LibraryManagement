<?php

use App\Models\Book;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use App\Http\Middleware\Pengembalian;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AktivasiEmail;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\PeminjamanController;
use App\Http\Controllers\LupaPasswordController;
use App\Http\Controllers\PengembalianController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\Payment\MidtransController;
use App\Http\Controllers\Payment\PembayaranController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::get('/activate/{token}', [AuthController::class, 'activate']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/book', [BookController::class, 'index']);
Route::get('/book/trending', [BookController::class, 'trending']);
Route::get('/book/{id}', [BookController::class, 'detailBuku']);
Route::post('/lupa-password', [LupaPasswordController::class, 'sendResetLink']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

Route::middleware(['auth:sanctum'])->group(function () {
    // Tambahkan ini di bagian bawah group ini:
    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user()
        ]);
    });
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/pinjam', [PeminjamanController::class, 'store']);
    Route::post('/pengembalian/{peminjaman_id}', [PengembalianController::class, 'store'])->middleware([Pengembalian::class]);
    Route::get('/peminjaman/riwayat', [PeminjamanController::class, 'riwayatUser']);
    Route::get('/peminjaman/jadwal-pengembalian', [PeminjamanController::class, 'jadwalPengembalian']);
    Route::get('/pembayaran/snap-token/{pengembalian_id}', [MidtransController::class, 'generateSnapToken']);
    Route::get('/pengembalian-by-peminjaman/{peminjaman_id}', [PengembalianController::class, 'getByPeminjaman']);
    Route::post('/pembayaran/snap-token/{pengembalian_id}', [MidtransController::class, 'generateSnapToken']);


    Route::post('/midtrans-callback', [MidtransController::class, 'handleNotification']);
    Route::get('/pembayaran/status/{order_id}', [PembayaranController::class, 'checkStatus']);
    Route::post('/pembayaran/update-status', [PembayaranController::class, 'updateStatus']);

});

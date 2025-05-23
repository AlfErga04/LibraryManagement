<?php

namespace App\Http\Controllers\Payment;

use Midtrans\Snap;
use App\Models\Pembayaran;
use App\Models\Pengembalian;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MidtransController extends Controller
{
    public function generateSnapToken($pengembalian_id)
    {

        $pengembalian = Pengembalian::with('peminjaman.user')->findOrFail($pengembalian_id);

        $user = Auth::user();

        if ($pengembalian->peminjaman->user_id !== $user->id) {
            return response()->json([
                'mesage' => 'Tidak ada denda',
            ], 403);
        }

         $pembayaran = Pembayaran::where('pengembalian_id', $pengembalian_id)->first();

         if (!$pembayaran) {
            $pembayaran = new Pembayaran();
            $pembayaran->pengembalian_id = $pengembalian->id;
            $pembayaran->jumlah_denda = $pengembalian->denda;
            $pembayaran->status = 'pending';
            $pembayaran->save();
        }

        // Set konfigurasi Midtrans
        \Midtrans\Config::$serverKey = config('midtrans.serverKey');
        \Midtrans\Config::$isProduction = false;
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;


        // Set parameter Snap
        $params = [
            'transaction_details' => [
                'order_id' => 'ORDER-' . $pembayaran->id . '-' . time(),
                'gross_amount' => (int) $pembayaran->jumlah_denda,
            ],
            'customer_details' => [
                'user_name' => $user->name,
                'email' => $user->email,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        $pembayaran->snap_token = $snapToken;
        $pembayaran->save();

        return response()->json([
            'snap_token' => $snapToken
        ]);
    }
}

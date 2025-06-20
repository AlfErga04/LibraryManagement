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
    // Validasi autentikasi
    $user = Auth::user();
    if (!$user) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    $pengembalian = Pengembalian::with('peminjaman.user')->findOrFail($pengembalian_id);

    // Validasi kepemilikan peminjaman
    if ($pengembalian->peminjaman->user_id !== $user->id) {
        return response()->json([
            'message' => 'Anda tidak memiliki akses ke pembayaran ini',
        ], 403);
    }

    // Validasi denda harus lebih dari 0
    if ($pengembalian->denda <= 0) {
        return response()->json([
            'message' => 'Tidak ada denda yang perlu dibayar',
        ], 400);
    }

    // Cari atau buat record pembayaran
    $pembayaran = Pembayaran::firstOrNew(['pengembalian_id' => $pengembalian_id]);
    
    // Generate unique order ID
    $orderId = 'LIBRARY-' . $pengembalian_id . '-' . time();
    
    $pembayaran->fill([
        'jumlah_denda' => $pengembalian->denda,
        'status' => 'pending',
        'order_id' => $orderId // Simpan order_id ke database
    ])->save();

    // Konfigurasi Midtrans
    \Midtrans\Config::$serverKey = config('midtrans.serverKey');
    \Midtrans\Config::$isProduction = config('midtrans.isProduction');
    \Midtrans\Config::$isSanitized = true;
    \Midtrans\Config::$is3ds = true;

    // Parameter transaksi
    $params = [
        'transaction_details' => [
            'order_id' => $orderId,
            'gross_amount' => (int) $pembayaran->jumlah_denda,
        ],
        'customer_details' => [
            'first_name' => $user->name,
            'email' => $user->email,
        ],
        'callbacks' => [
            'finish' => config('http://localhost:5173/borrow-history') . '/payment-callback'
        ]
    ];

    try {
        $snapToken = Snap::getSnapToken($params);
        
        $pembayaran->update(['snap_token' => $snapToken]);
        
        return response()->json([
            'snap_token' => $snapToken,
            'order_id' => $orderId // Sertakan order_id di response
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Gagal generate payment token',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function handleNotification(Request $request)
{
    if (isset($_GET['force_success'])) {
    $pembayaran = Pembayaran::where('order_id', $_GET['order_id'])->first();
    $pembayaran->update(['status' => 'success']);
    exit('Manually updated to success');
}
    $payload = $request->getContent();
    $notification = json_decode($payload, true);

    // Log the incoming notification for debugging
    \Log::info('Midtrans Notification:', $notification);

    // Validate signature key
    $validSignatureKey = hash("sha512", 
        $notification['order_id'] . 
        $notification['status_code'] . 
        $notification['gross_amount'] . 
        config('midtrans.serverKey'));

    if ($notification['signature_key'] != $validSignatureKey) {
        \Log::error('Invalid signature', ['order_id' => $notification['order_id']]);
        return response()->json(['message' => 'Invalid signature'], 403);
    }

    // Find the payment record
    $pembayaran = Pembayaran::where('order_id', $notification['order_id'])->first();

    if (!$pembayaran) {
        \Log::error('Payment not found', ['order_id' => $notification['order_id']]);
        return response()->json(['message' => 'Payment not found'], 404);
    }

    // Handle different transaction statuses
    $transactionStatus = $notification['transaction_status'];
    $fraudStatus = $notification['fraud_status'] ?? null;

    // Mapping status Midtrans ke ENUM kita
    $statusMapping = [
        'capture' => 'success',
        'settlement' => 'success',
        'pending' => 'pending',
        'deny' => 'failed',
        'expire' => 'failed',
        'cancel' => 'failed',
        'failure' => 'failed'
    ];

    // Dapatkan status yang sesuai dengan ENUM
    $enumStatus = $statusMapping[$transactionStatus] ?? 'pending';

    try {
        if ($enumStatus === 'success') {
            $this->updatePaymentSuccess($pembayaran, $notification);
        } else {
            $pembayaran->update(['status' => $enumStatus]);
        }

        \Log::info('Payment status updated', [
            'order_id' => $notification['order_id'],
            'midtrans_status' => $transactionStatus,
            'enum_status' => $enumStatus
        ]);

    } catch (\Exception $e) {
        \Log::error('Failed to update payment status', [
            'error' => $e->getMessage(),
            'notification' => $notification
        ]);
        return response()->json(['message' => 'Failed to process notification'], 500);
    }

    return response()->json(['message' => 'Notification processed']);
}

protected function updatePaymentSuccess($pembayaran, $notification)
{
    $updateData = [
        'status' => 'success', // Pastikan sesuai dengan ENUM
        'waktu_bayar' => $notification['settlement_time'] ?? now(),
        'payment_type' => $notification['payment_type'] ?? null,
        'bank' => $notification['va_numbers'][0]['bank'] ?? $notification['payment_type'] ?? null
    ];

    $pembayaran->update($updateData);
    
    \Log::info('Payment updated to success', [
        'order_id' => $notification['order_id'],
        'data' => $updateData
    ]);
}
}

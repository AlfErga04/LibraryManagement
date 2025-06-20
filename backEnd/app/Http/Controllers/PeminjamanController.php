<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Book;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\RiwayatResource;

class PeminjamanController extends Controller
{
    public function store(Request $request)
    {
        $validate = $request->validate([
            'book_id' => 'required|exists:books,id',
            'tenggat' => 'required|date|after_or_equal:today',
        ]);

        $user = Auth::user();
        $book = Book::findOrFail($request->book_id);

        if ($book->stok < 1) {
            return response()->json(['message' => 'Stok buku kosong'], 400);
        }

        $peminjaman = Peminjaman::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'tanggal_pinjam' => Carbon::now(),
            'tenggat' => $request->tenggat,
            'status' => 'dipinjam',
        ]);

        $book->decrement('stok');

        return response()->json(['status' => 'success', 'message' => 'Berhasil meminjam buku'], 201);
    }

    public function riwayatUser()
    {
        $user = auth()->user();

        $peminjaman = Peminjaman::with([
            'book:id,judul',
            'pengembalian:id,peminjaman_id,denda',
            'pengembalian.pembayaran:id,pengembalian_id,jumlah_denda,waktu_bayar' // Pastikan ini sesuai
        ])
            ->where('user_id', $user->id)
            ->whereIn('status', ['dikembalikan', 'telat']) // Filter status
            ->orderBy('created_at', 'desc')
            ->get();

        return RiwayatResource::collection($peminjaman);
    }

    public function jadwalPengembalian()
    {
        $user = auth()->user();
        $peminjaman = Peminjaman::with([
            'book:id,judul',
            'pengembalian:id,peminjaman_id,denda',
            'pengembalian.pembayaran:id,pengembalian_id,status,order_id,waktu_bayar'
        ])
            ->where('user_id', $user->id)
            ->whereIn('status', ['dipinjam'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $peminjaman->map(function ($item) {
                return [
                    'id' => $item->id,
                    'book' => $item->book->judul,
                    'tanggal_pinjam' => $item->tanggal_pinjam,
                    'tenggat' => $item->tenggat,
                    'status' => $item->status,
                    'denda' => $item->pengembalian->denda ?? 0,
                    'pengembalian' => $item->pengembalian ? [
                        'id' => $item->pengembalian->id,
                        'pembayaran' => $item->pengembalian->pembayaran
                    ] : null
                ];
            })
        ]);
    }
}

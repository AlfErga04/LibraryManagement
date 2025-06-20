<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PengembalianController extends Controller
{
    public function store(Request $request)
    {
        $peminjaman = Peminjaman::findOrFail($request->peminjaman_id);
        $tanggalKembali = Carbon::now()->startOfDay();
        $tenggat = Carbon::parse($peminjaman->tenggat)->startOfDay();

        if ($tanggalKembali->greaterThan($tenggat)) {
            $selisihHari = $tenggat->diffInDays($tanggalKembali);
            $denda = $selisihHari * 5000;
            $peminjaman->status = 'telat';
        } else {
            $denda = 0;
            $peminjaman->status = 'dikembalikan';
        }
        $peminjaman->save();

        //simpan data pengemblian
        Pengembalian::create([
            'tanggal_kembali' => $tanggalKembali,
            'denda' => $denda,
            'peminjaman_id' => $peminjaman->id
        ]);


        //update stok
        $book = Book::findOrFail($peminjaman->book_id);
        $book->stok += 1;
        $book->save();

        return response()->json(['status' => 'success', 'message' => 'Buku berhasil dikembalikan',]);
    }

    public function getByPeminjaman($peminjaman_id)
    {
        $pengembalian = Pengembalian::where('peminjaman_id', $peminjaman_id)->firstOrFail();

        return response()->json([
            'id' => $pengembalian->id,
            'denda' => $pengembalian->denda
        ]);
    }
}

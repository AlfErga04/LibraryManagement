<?php

namespace App\Http\Controllers;

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
            'tanggal_pinjam' => 'required|date',
            'tenggat' => 'required|date|after_or_equal:tanggal_pinjam',
        ]);

        $user = Auth::user();
        $book = Book::findOrFail($request->book_id);

        if ($book->stok < 1) {
            return response()->json(['message' => 'Stok buku kosong'], 400);
        }

        $peminjaman = Peminjaman::create([
            'user_id' => $user->id,
            'book_id' => $book->id,
            'tanggal_pinjam' => $request->tanggal_pinjam,
            'tenggat' => $request->tenggat,
            'status' => 'dipinjam',
        ]);

        $book->decrement('stok');

        return response()->json(['message' => 'Berhasil meminjam buku'], 201);
    }

    public function riwayatUser() {
        $user = auth()->user();
        $peminjaman = Peminjaman::with(['book', 'pengembalian'])->where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        return RiwayatResource::collection($peminjaman);
    }

}

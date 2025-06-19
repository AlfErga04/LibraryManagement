<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoritesController extends Controller
{
    /**
     * Toggle favorit buku (tambah/hapus)
     */
    public function toggle($bookId, Request $request)
    {
        $user = $request->user();

        $favorite = Favorite::where('user_id', $user->id)
                            ->where('book_id', $bookId)
                            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Dihapus dari favorit']);
        } else {
            Favorite::create([
                'user_id' => $user->id,
                'book_id' => $bookId,
            ]);
            return response()->json(['message' => 'Ditambahkan ke favorit']);
        }
    }

    /**
     * Ambil daftar buku favorit user
     */
    public function list(Request $request)
    {
        $user = $request->user();

        // Ambil data buku favorit dari relasi favoriteBooks
        $favorites = $user->favoriteBooks()->get();

        // Format ulang agar sesuai dengan frontend
        $formatted = $favorites->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->judul,
                'author' => $book->penulis,
                'year' => $book->tahun_terbit,
                'image' => $book->image ? asset('storage/' . $book->image) : null,
            ];
        });

        return response()->json($formatted);
    }
}

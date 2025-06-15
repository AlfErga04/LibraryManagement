<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use App\Http\Resources\DetailBookResource;
use App\Http\Resources\TrendingResource;
use Illuminate\Support\Facades\Auth;


class BookController extends Controller
{
    public function index(){
        $book = Book::with('category')->get();
        return BookResource::collection($book);
    }

    public function detailBuku($id){
        $book = Book::findOrFail($id);
        return new DetailBookResource($book);
    }

    public function trending(){
        $book = Book::withCount('peminjaman')->orderByDesc('peminjaman_count')->take(3)->get();
        return TrendingResource::collection($book);
    }

    public function toggleFavorite(Book $book)
    {
    $user = Auth::user();

    if ($user->favoriteBooks()->where('book_id', $book->id)->exists()) {
        $user->favoriteBooks()->detach($book->id);
        return response()->json(['message' => 'Dihapus dari buku favorit']);
    } else {
        $user->favoriteBooks()->attach($book->id);
        return response()->json(['message' => 'Ditambahkan ke buku favorit']);
    }
    }

    public function FavBook()
    {
    $user = Auth::user();
    $favorites = $user->favoriteBooks()->get();

    return response()->json($favorites);
    }

}

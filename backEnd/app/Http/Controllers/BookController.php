<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use App\Http\Resources\DetailBookResource;
use App\Http\Resources\TrendingResource;

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
}

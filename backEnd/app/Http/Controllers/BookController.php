<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use App\Http\Resources\BookResource;
use App\Http\Resources\DetailBookResource;

class BookController extends Controller
{
    public function index(){
        $book = Book::all();
        return BookResource::collection($book);
    }

    public function detailBuku($id){
        $book = Book::findOrFail($id);
        return new DetailBookResource($book);
    }
}

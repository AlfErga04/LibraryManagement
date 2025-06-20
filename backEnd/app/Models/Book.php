<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Peminjaman;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'judul',
        'image',
        'isbn',
        'penulis',
        'penerbit',
        'tahun_terbit',
        'stok',
        'description',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
    }

}

<?php

namespace App\Models;

use App\Models\Book;
use App\Models\User;
use App\Models\Pengembalian;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Peminjaman extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'peminjaman';
    protected $fillable = [
        'tanggal_pinjam',
        'tenggat',
        'status',
        'user_id',
        'book_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function pengembalian()
    {
        return $this->hasOne(Pengembalian::class);
    }
}

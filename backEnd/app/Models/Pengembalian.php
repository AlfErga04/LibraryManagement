<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    protected $table = 'pengembalian';
    protected $fillable = [
        'tanggal_kembali',
        'denda',
        'peminjaman_id'
    ];
}

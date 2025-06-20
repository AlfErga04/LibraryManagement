<?php

namespace App\Models;

use App\Models\Pembayaran;
use App\Models\Peminjaman;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    protected $table = 'pengembalian';
    protected $fillable = [
        'tanggal_kembali',
        'denda',
        'peminjaman_id'
    ];

    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class);
    }
    
public function pembayaran()
{
    return $this->hasOne(Pembayaran::class);
}
}

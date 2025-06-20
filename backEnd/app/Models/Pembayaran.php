<?php

namespace App\Models;

use App\Models\Pengembalian;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';
    protected $fillable = [
        'jumlah_denda',
        'waktu_bayar',
        'pengembalian_id'
    ];

    public function pengembalian()
    {
        return $this->belongsTo(Pengembalian::class);
    }
}

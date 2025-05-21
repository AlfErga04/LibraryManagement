<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';
    protected $fillable = [
        'status',
        'snap_token',
        'jumlah_denda',
        'waktu_bayar',
        'pengembalian_id'
    ];
}

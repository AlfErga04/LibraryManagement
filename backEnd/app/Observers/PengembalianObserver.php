<?php

namespace App\Observers;

use App\Models\Pengembalian;
use Illuminate\Support\Carbon;

class PengembalianObserver
{
    /**
     * Handle the Pengembalian "created" event.
     */
    public function created(Pengembalian $pengembalian): void
    {
        $peminjaman = $pengembalian->peminjaman;
        
        if ($peminjaman->status === 'dipinjam') {
            $telat = Carbon::now()->gt($peminjaman->tenggat);
            
            $peminjaman->update([
                'status' => $telat ? 'telat' : 'dikembalikan'
            ]);
        }
    }

    /**
     * Handle the Pengembalian "updated" event.
     */
    public function updated(Pengembalian $pengembalian): void
    {
        //
    }

    /**
     * Handle the Pengembalian "deleted" event.
     */
    public function deleted(Pengembalian $pengembalian): void
    {
        //
    }

    /**
     * Handle the Pengembalian "restored" event.
     */
    public function restored(Pengembalian $pengembalian): void
    {
        //
    }

    /**
     * Handle the Pengembalian "force deleted" event.
     */
    public function forceDeleted(Pengembalian $pengembalian): void
    {
        //
    }
}

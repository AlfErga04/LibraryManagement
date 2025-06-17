<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RiwayatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'book' => $this->book->judul,
            'tanggal_pinjam' => $this->tanggal_pinjam,
            'tenggat' => $this->tenggat,
            'status' => $this->status,
            'denda' => optional($this->pengembalian)->denda ?? 0,
            'pengembalian' => $this->pengembalian ? [
                'pembayaran' => $this->pengembalian->pembayaran,
            ] : null
        ];
    }
}

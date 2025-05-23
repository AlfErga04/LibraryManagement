<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrendingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul' => $this->judul,
            'penulis' => $this->penulis,
            'image' => $this->image,
            'jumlah_peminjaman' => $this->peminjaman_count,
            'category' => $this->category->name
        ];
    }
}

<?php

namespace App\Http\Middleware;

use App\Models\Peminjaman;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Pengembalian
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $peminjamanId = $request->route('peminjaman_id');
        $peminjaman = Peminjaman::findOrFail($peminjamanId);

        if ($peminjaman->user_id !== auth()->id()) {
            return response()->json(['message' => 'Bukan anda yang meminjam buku ini.'], 403);
        }

        return $next($request);
    }
}

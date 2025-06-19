<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class LupaPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
         $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);
        
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email tidak terdaftar'], 404);
        }

        $status = Password::sendResetLink(
            $request->only('email'),
            function ($user, $token) {
                $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
                $resetUrl = $frontendUrl.'/reset-password?token='.$token.'&email='.$user->email;
                
                $user->sendPasswordResetNotification($token, $resetUrl);
            }
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Email reset password berhasil dikirim'])
            : response()->json(['message' => 'Gagal mengirim email reset'], 500);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class LupaPasswordController extends Controller
{
    public function sendResetLink(Request $request){
        $validate = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $status = Password::sendResetLink($request->only('email'));

         return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Email Reset Password berhasil dikirim'])
            : response()->json(['message' => 'Email Reset Password gagal dikirim'], 400);
    }
}

<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EditProfile extends Controller
{
    public function edit(Request $request)
    {
        $user = Auth::user();

        $validate = $request->validate([
            'name' => 'required|unique:users',
            'email' => 'required',
            'address' => 'required',
            'phone' => 'required',
        ]);

        try {
                $user->name = $request->name;
                $user->email = $request->email;
                $user->address = $request->address;
                $user->phone = $request->phone;
                $user->save();

            return response()->json(['message', 'Profile Berhasil di update']);
        } catch (Exception $e) {
            return response()->json([
                'satus' => 'error',
                'message' => 'Update Gagal!'
            ]);
        }
    }
}

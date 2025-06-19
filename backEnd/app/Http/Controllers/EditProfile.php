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
            'name' => 'required|unique:users,name,' .$user->id,
            'email' => 'required|unique:users,email,' .$user->id,
            'address' => 'required',
            'phone' => 'required',
        ]);

        try {
            $user->update([
               'name'=> $request->name,
               'email'=> $request->email,
               'address'=> $request->address,
               'phone'=> $request->phone
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Profile berhasil di update',
                'user' => $user
            ]);
        } catch (Exception $e) {
            return response()->json([
                'satus' => 'error',
                'message' => 'Gagal update profile!'
            ]);
        }
    }
}

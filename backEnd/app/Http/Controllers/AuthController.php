<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\ActivationEmail;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validate = $request->validate([
            'name' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
            'address' => 'required',
            'phone' => 'required|numeric|unique:users',
        ]);
        
        $activationToken = Str::random(64);

        try {
            $user = User::create([
                'name' => $validate['name'],
                'email' => $validate['email'],
                'password' => Hash::make($validate['password']),
                'address' => $validate['address'],
                'phone' => $validate['phone'],
                'activation_token' => $activationToken
            ]);

            Mail::to($user->email)->send(new ActivationEmail($user, $activationToken));
            return response()->json(['success' => "Register Berhasil"], 201);

        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat registrasi!'
            ], 500);
        }


    }

    public function activate ($token){
        $user = User::where('activation_token', $token)->first();
        if(!$user){
            return response()->json(['message' => 'Token tidak valid']);
        }

        $user->is_active = 1;
        $user->activation_token = null;
        $user->save();

        return response()->json(['message' => 'Akun berhasil di aktivasi!']);
    }

    public function login(Request $request){
        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Email atu Password Salah'],
            ]);
        }
        if ($user->is_active !== 1) {
            return response()->json(['status' => 'error','message' => 'Akun belum diaktivasi!'], 401);
        }
        $token = $user->createToken('login user ' . $user->name)->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message', 'Berhasil logout']);
    }
}

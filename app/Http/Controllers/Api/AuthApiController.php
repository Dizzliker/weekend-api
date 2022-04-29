<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Friend;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthApiController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required',
            'surname' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'surname' => $fields['surname'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
        ]);
        if (Auth::guard()->attempt($request->only('email', 'password'))) {
            if ($request->hasSession()) {
                $request->session()->put('auth.password_confirmed_at', time());
            }
        }

        $token = $user->createToken('user_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $fields['email'])->first();
        if (!$user) {
            return response(([
                "errors" => [
                    "email" => ["Email not found"]
                ]
            ]), 401);
        }
        if (!Hash::check($fields['password'], $user->password)) {
            return response([
                "errors" => [
                    "password" => ["Password is incorrect"]
                ]
            ], 401);
        }
        if ($user->is_banned) {
            return response([
                "errors" => [
                    "access" => ["User is banned"]
                ]
            ], 401);
        }
        if (Auth::guard()->attempt($request->only('email', 'password'))) {
            if ($request->hasSession()) {
                $request->session()->put('auth.password_confirmed_at', time());
            }
        }

        $token = $user->createToken('user_token')->plainTextToken;

        $response = [
            'user' => $user,
            'count_unread_messages' => Message::getCountUnreadMessages($user->id),
            'count_friend_requests' => Friend::getCountFriendRequests($user->id),
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function logout() {
        auth()->user()->tokens()->delete();

        return [
            "message" => "Logged out",
        ];
    }
}

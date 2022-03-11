<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;

class TokenApiController extends Controller
{
    public function update(Request $request)
    {
        $token = Str::random(60);
 
        $request->user()->forceFill([
            'token' => hash('sha256', $token),
        ])->save();
 
        return ['token' => $token];
    }
}

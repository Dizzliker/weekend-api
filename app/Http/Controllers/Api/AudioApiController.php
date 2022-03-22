<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Audio;
use Illuminate\Http\Request;

class AudioApiController extends Controller
{
    public function add_audio(Request $request) {
        $fields = $request->validate([
            'author' => 'required',
            'name' => 'required',
            'src' => 'required',
            'duration' => 'required|float',
            'cover' => 'required',
        ]);

        Audio::create([
            'author' => $fields['author'],
            'name' => $fields['name'],
            'src' => $fields['src'],
            'duration' => $fields['duration'],
            'cover' => $fields['cover'],
        ]);
    }
}

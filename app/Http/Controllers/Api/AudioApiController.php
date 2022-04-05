<?php

namespace App\Http\Controllers\Api;

use App\Models\Audio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AudioApiController extends Controller
{
    public function add_audio(Request $request) {
        $fields = $request->validate([
            'author' => 'required',
            'name' => 'required',
            'cover' => 'required|image',
            'audio' => 'required|mimes:mp3'
        ]);
        
        $srcAudio = time().rand(1,100).'.'.$request->audio->extension();
        $request->audio->move(public_path('music'), $srcAudio);

        $srcCover = time().rand(1,100).'.'.$request->cover->extension();
        $request->cover->move(public_path('images/covers'), $srcCover);

        return Audio::create([
            'author' => $fields['author'],
            'name' => $fields['name'],
            'src' => '/images/covers/'.$srcAudio,
            'duration' => 0,
            'cover' => $srcCover,
        ]);
    }

    public function get_all_audios() {
        $audios = DB::select('
            select a.id audio_id,
                   a.name,
                   a.author,
                   a.src,
                   a.cover
              from audios a
        ');

        return response(['audios' => $audios]);
    }
}

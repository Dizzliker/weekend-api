<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GalleryApiController extends Controller
{
    public function add_photos(Request $request) {
        $fields = $request->validate([
            'user_id' => 'integer|required',
            'img' => 'required'
        ]);

        if ($request->hasFile('img')) {
            foreach ($request->img as $file) {
                $name = time().rand(1,100).'.'.$file->extension();
                $file->move(public_path('images/gallery'), $name);

                Gallery::create([
                    'user_id' => $fields['user_id'],
                    'img' => 'images/gallery/'.$name,
                    'description' => null,
                ]);
            }
            return response(['success' => $request->file('img')]);
        };

        return $request->img;
    }

    public function gallery($id) {
        $gallery = Gallery::where('user_id', $id)->get();

        return response(['gallery' => $gallery]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GalleryApiController extends Controller
{
    public function addPhotos(Request $request) {
        $fields = $request->validate([
            'user_id' => 'integer|required',
            'images' => 'required|image'
        ]);

        $name = time().rand(1,100).'.'.$request->images->extension();
        $request->images->move(public_path('images/gallery'), $name);

        return Gallery::create([
            'user_id' => $fields['user_id'],
            'img' => 'images/gallery/'.$name,
            'description' => null,
        ]);
    }

    public function getGallery($id) {
        $gallery = DB::select('
            select g.id,
                   g.img
              from gallery g
             where g.user_id = '.$id.' 
        ');

        return response(['gallery' => $gallery]);
    }
}

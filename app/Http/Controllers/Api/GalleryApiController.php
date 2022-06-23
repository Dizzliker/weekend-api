<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GalleryApiController extends Controller
{
    public function getAll() {
        return response(['photos' => Gallery::all()]);
    }

    public function addPhotos(Request $request) {
        $fields = $request->validate([
            'user_id' => 'integer|required',
            'images' => 'required|image'
        ]);

        $name = time().rand(1,100).'.'.$request->images->extension();
        $request->images->move(public_path('images/gallery'), $name);

        return Gallery::create([
            'user_id' => $fields['user_id'],
            'img' => '/images/gallery/'.$name,
            'description' => null,
        ]);
    }

    public function getGallery($id) {
        return response(['gallery' => Gallery::getGallery($id)]);
    }

    public function getProfileGallery($id) {
        return response(['user' => User::find($id), 'gallery' => Gallery::getProfileGallery($id)]);
    }

    public function likePhoto($id) {
        if (!Auth::check()) {return response(['success' => false]);}

        Gallery::likePhoto($id, Auth::id());

        return response(['success' => true]);
    }

    public function unLikePhoto($id) {
        if (!Auth::check()) {return response(['success' => false]);}

        Gallery::unLikePhoto($id, Auth::id());

        return response(['success' => true]);
    }

    public function addComment(Request $request) {
        if (!Auth::check()) {return response(['success' => false]);}
        $fields = $request->validate([
            'photo_id' => 'required',
            'text' => 'required',
        ]);
        return response(['success' => true, 'comment' => Gallery::addComment($fields['photo_id'], $fields['text'])]);
    }

    public function deletePhoto($id) {
        Gallery::find($id)->delete();
        return response(['success' => true]);
    }
}

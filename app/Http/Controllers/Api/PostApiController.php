<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostApiController extends Controller
{
    public function index($id) {
        $posts = Post::find($id);
        return $posts;
    }

    public function store(Request $request) {
        $fields = $request->validate([
            'user_id' => 'required|integer',
            'text' => 'required'
        ]);

        $post = Post::create([
            'user_id' => $fields['user_id'],
            'text' => $fields['text'],
            'likes' => 0,
            'reposts' => 0,
            'comments' => 0
        ]);

        return new PostResource($post);
    }
}

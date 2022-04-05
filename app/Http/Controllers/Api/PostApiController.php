<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PostApiController extends Controller
{
    public function index($id) {
        $posts = DB::select('
            select u.id user_id,
                   p.id post_id,
                   u.name,
                   u.surname,
                   u.avatar,
                   p.text,
                   (select count(pl.id) 
                      from post_likes pl 
                     where pl.post_id = p.id) likes,
                   exists (
                       select null
                         from post_likes pl
                        where pl.user_id = '.Auth::id().'
                          and pl.post_id = p.id) i_like,
                   0 comments,
                   0 reposts,
                   date_format(p.created_at, "%d.%m.%Y %H:%i") updated_at,
                   date_format(p.created_at, "%d.%m.%Y %H:%i") created_at
              from users u
                   join posts p on p.user_id = u.id
             where u.id = '.$id.'
            order by p.created_at desc 
        ');

        return response(['posts' => PostResource::collection($posts)]);
    }

    public function store(Request $request) {
        $fields = $request->validate([
            'user_id' => 'required|integer',
            'text' => 'required'
        ]);

        $post = Post::create([
            'user_id' => $fields['user_id'],
            'text' => $fields['text'],
        ]);

        return new PostResource($post);
    }

    public function like(Request $request, $id) {
        $fields = $request->validate([
            'user_id' => 'required|integer',
        ]);

        DB::table('post_likes')->insert([
            'post_id' => $id,
            'user_id' => $fields['user_id'],
        ]);

        return response(['success' => true]);
    }

    public function unlike(Request $request, $id) {
        $fields = $request->validate([
            'user_id' => 'required|integer'
        ]);

        DB::select('
            delete 
              from post_likes
             where post_likes.post_id = '.$id.'
               and post_likes.user_id = '.$fields['user_id'].' 
        ');

        return response(['success' => true]);
    }

    public function delete($id) {
        $post = Post::find($id);
        if ($post) {
            $post->delete();
            return response([
                "messages" => [
                    "success" => true,
                ],
                "post" => $post,
            ], 201);
        }
        return response(["messages" => "Post with this id is not found"], 400);
    }
}

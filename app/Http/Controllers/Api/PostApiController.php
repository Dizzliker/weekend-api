<?php

namespace App\Http\Controllers\Api;

use App\Events\PostDeleted;
use App\Events\PostLiked;
use App\Events\PostPublished;
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
                   p.id,
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

        $postResource = new PostResource($post);

        PostPublished::dispatch($postResource);

        return $postResource;
    }

    public function like(Request $request, $id) {
        $fields = $request->validate([
            'user_id' => 'required|integer',
        ]);

        DB::table('post_likes')->updateOrInsert([
            'post_id' => $id,
            'user_id' => $fields['user_id'],
        ]);

        PostLiked::dispatch($id, Post::getAuthorIdByPostId($id), $fields['user_id'], true);

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

        PostLiked::dispatch($id, Post::getAuthorIdByPostId($id), $fields['user_id'], false);

        return response(['success' => true]);
    }

    public function delete($id) {
        $post = Post::find($id);
        if ($post) {
            PostDeleted::dispatch(Post::getAuthorIdByPostId($id), $id);
            $post->delete();
            return response(["success" => true], 201);
        }
        return response(["messages" => "Post with this id is not found"], 400);
    }
}

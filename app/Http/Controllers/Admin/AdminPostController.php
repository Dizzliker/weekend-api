<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminPostController extends Controller
{
    public function get_all() {
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
                   0 comments,
                   0 reposts,
                   date_format(p.created_at, "%d.%m.%Y %H:%i") updated_at,
                   date_format(p.created_at, "%d.%m.%Y %H:%i") created_at
              from posts p
                   join users u on u.id = p.user_id
        ');

        return response(['posts' => $posts]);
    }
}

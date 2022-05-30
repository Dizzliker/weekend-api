<?php

namespace App\Models;

use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'text',
        'likes',
        'reposts',
        'comments',
    ];

    protected $casts = [
        'created_at' => 'datetime:d.m.Y H:i',
        'updated_at' => 'datetime:d.m.Y H:i',
    ];

    public function user() {
        return $this->hasOne(User::class);
    }

    public static function getFriendPosts($user_id) {
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
                    where pl.user_id = '.$user_id.'
                      and pl.post_id = p.id) i_like,
               0 comments,
               0 reposts,
               date_format(p.created_at, "%d.%m.%Y %H:%i") updated_at,
               date_format(p.created_at, "%d.%m.%Y %H:%i") created_at
          from users u
               join posts p on p.user_id = u.id
         where u.id in (
            select 
             (case when f.user_id   = '.$user_id.' then f.friend_id
                   when f.friend_id = '.$user_id.' then f.user_id end) friend_id
              from friends f)
        order by p.created_at desc 
        ');

        return $posts;
    }

    public static function getAuthorIdByPostId($post_id) {
        return DB::select('
            select p.user_id
              from posts p
             where p.id = '.$post_id.'
            limit 1  
        ')[0]->user_id;
    }
}

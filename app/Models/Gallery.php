<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'img',
        'description'
    ];

    protected $table = 'gallery';

    public static function getGallery($user_id) {
        return DB::select('
            select g.id,
                   g.img
              from gallery g
             where g.user_id = '.$user_id.' 
        ');
    }

    public static function getProfileGallery($user_id) {
        return DB::select('
            select g.id,
                   g.img,
                   u.id user_id,
                   u.avatar,
                   u.name,
                   u.surname,
                   (select count(gl.id)
                      from gallery_likes gl
                     where gl.photo_id = g.id) likes,
                   exists (
                       select null
                         from gallery_likes gl
                        where gl.user_id = '.Auth::id().'
                          and gl.photo_id = g.id) i_like,
                   0 comments,
                   0 reposts,
                   date_format(g.created_at, "%d.%m.%Y %H:%i") created_at
              from gallery g
                   join users u on u.id = g.user_id
             where g.user_id = '.$user_id.' 
        ');
    }

    public static function likePhoto($photo_id, $user_id) {
        return DB::table('gallery_likes')->updateOrInsert([
            'photo_id' => $photo_id,
            'user_id' => $user_id,
            'updated_at' => time(),
            'created_at' => time(),
        ]);
    }

    public static function unLikePhoto($photo_id, $user_id) {
        return DB::select('
            delete
              from gallery_likes
             where gallery_likes.user_id = '.$user_id.' and gallery_likes.photo_id = '.$photo_id.'
        ');
    }

    public static function addComment($photo_id, $text) {
        return DB::table('gallery_comment')->insert([
            'photo_id' => $photo_id,
            'user_id' => Auth::id(),
            'text' => $text,
            'updated_at' => time(),
            'created_at' => time(),
        ]);
    }
}

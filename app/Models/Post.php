<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
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

    public static function getAuthorIdByPostId($post_id) {
        return DB::select('
            select p.user_id
              from posts p
             where p.id = '.$post_id.'
            limit 1  
        ')[0]->user_id;
    }
}

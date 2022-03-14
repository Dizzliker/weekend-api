<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'text',
        'likes',
        'reposts',
        'comments',
<<<<<<< HEAD
=======
    ];

    protected $casts = [
        'created_at' => 'datetime:d.m.Y H:i',
        'updated_at' => 'datetime:d.m.Y H:i',
>>>>>>> d54ce1f043f48b3916c0640048d6d1f40934688e
    ];

    public function user() {
        return $this->hasOne(User::class);
    }
}

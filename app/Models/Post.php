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
    ];

    public function user() {
        return $this->hasOne(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'out_user_id',
        'inc_user_id',
        'text',
        'read',
    ];

    protected $casts = [
        'created_at' => 'datetime:d.m.Y H:i',
        'updated_at' => 'datetime:d.m.Y H:i',
    ];

    public static function getCountUnreadMessages($user_id) {
        $count = DB::select('
            select count(*) count
              from messages m 
             where m.read = 0
               and m.inc_user_id = '.$user_id.' 
        ');

        return $count[0]->count;
    }
}

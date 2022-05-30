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

    public static function getRangedChat($out_user_id, $inc_user_id, $startRange) {
        return DB::select('
            select m.id,
                   m.inc_user_id,
                   m.out_user_id,
                   m.text,
                   m.read,
                   date_format(m.created_at, "%H:%i") created_at
              from messages m 
             where (m.out_user_id = '.$out_user_id.' and m.inc_user_id = '.$inc_user_id.')
                or (m.inc_user_id = '.$out_user_id.' and m.out_user_id = '.$inc_user_id.')
            order by m.created_at desc    
            limit '.$startRange.', 100    
    ');
    }
}

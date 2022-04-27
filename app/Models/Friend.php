<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Friend extends Model
{
    use HasFactory;

    protected $table = 'friends';

    public static function get_friend_requests($user_id) {
        $count_requests = DB::select('
            select count(*) count
              from friends f 
             where f.friend_id = '.$user_id.'
               and f.status = 0 
        '); 

        return $count_requests[0]->count;
    }
}

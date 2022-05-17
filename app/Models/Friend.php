<?php

namespace App\Models;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Friend extends Model
{
    use HasFactory;

    protected $table = 'friends';

    public static function getFriends($user_id) {
        $friends = DB::select('
            select u.id,
                   u.name,
                   u.surname,
                   u.avatar
              from users u 
             where u.id in (
                select (case when f.user_id = '.$user_id.' 
                             then f.friend_id
                             when f.friend_id = '.$user_id.'
                             then f.user_id
                        end) user_id
                   from friends f
                  where (f.user_id   = '.$user_id.'
                     or f.friend_id = '.$user_id.')
                    and f.status = 1
            ) 
        ');

        return UserResource::collection($friends);
    }

    public static function getCountFriends($user_id) {
        return DB::select('
            select count(*) count
              from friends f
             where (f.user_id = '.$user_id.' or f.friend_id = '.$user_id.')
               and f.status = 1')[0]->count;
    }

    public static function getCountFriendRequests($user_id) {
        return DB::select('
            select count(*) count
              from friends f 
             where f.friend_id = '.$user_id.'
               and f.status = 0 
        ')[0]->count;
    }

    public static function getFriendRequests($user_id) {
        return DB::select('
            select u.id user_id,
                   u.name,
                   u.surname,
                   u.avatar,
                   (select f.id
                      from friends f
                     where f.user_id = u.id
                       and f.friend_id = '.$user_id.') request_id
              from users u 
             where u.id in (    
                select f.user_id
                  from friends f
                 where f.friend_id = '.$user_id.' 
                   and f.status = 0
             )
        ');
    }
}

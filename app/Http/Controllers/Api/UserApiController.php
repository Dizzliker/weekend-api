<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserApiController extends Controller
{
    public function friends($id) {
        $friends = DB::select('
            select u.id,
                   u.name,
                   u.surname,
                   u.avatar
              from users u 
             where u.id in (
                select (case when f.user_id = '.$id.' 
                             then f.friend_id
                             when f.friend_id = '.$id.'
                             then f.user_id
                        end) user_id
                   from friends f
                  where (f.user_id   = '.$id.'
                     or f.friend_id = '.$id.')
                    and f.status = 1
            ) 
        ');

        return UserResource::collection($friends);
    }

    public function count_friend_requests($id) {
        $countRequests = DB::select('
            select count(*) count
              from friends f 
             where f.friend_id = '.$id.'
               and f.status = 0 
        ');

       return response(['count' => $countRequests[0]->count]);
    }

    public function friend_requests($id) {
        $requests = DB::select('
            select u.id,
                   u.name,
                   u.surname,
                   u.avatar,
                   (select f.id
                      from friends f
                     where f.user_id = u.id
                       and f.friend_id = '.$id.') request_id
              from users u 
             where u.id in (    
                select f.user_id
                  from friends f
                 where f.friend_id = '.$id.' 
                   and f.status = 0
             )
        ');

        return response(['requests' => $requests]);
    }

    public function send_friend_request(Request $request) {
        if (Auth::id() == $request->get('user_id') && Auth::id() == $request->get('friend_id')) {
            return response(['messages' => ['Нельзя добавить себя в друзья']]);
        }
        $fields = $request->validate([
            'user_id' => 'integer|required',
            'friend_id' => 'integer|required',
        ]);
        $is_friends = DB::select(
            'select (case when f.status = 0
                         then "Friend request already sent"
                         when f.status = 1
                         then "Unable to send request, you are already friends"
                    end) message    
              from friends f
             where (f.user_id = '.$fields['user_id'].' and f.friend_id = '.$fields['friend_id'].')
                or (f.user_id = '.$fields['friend_id'].' and f.friend_id = '.$fields['user_id'].')'
        );
        if ($is_friends) {
            return response(['messages' => [$is_friends[0]->message]]);
        }
        DB::table('friends')->insert([
            'user_id' => $fields['user_id'],
            'friend_id' => $fields['friend_id'],
            'status' => false,
        ]);
        return response(['success' => true]);
    }
}

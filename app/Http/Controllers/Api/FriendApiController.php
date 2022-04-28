<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class FriendApiController extends Controller
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

        return response(['friends' => UserResource::collection($friends)]);
    }

    public function count_friends($id) {
        $count = DB::select('
            select count(*) count
              from friends f
             where (f.user_id = '.$id.' or f.friend_id = '.$id.')
               and f.status = 1
        ');

        return response(['count' => $count[0]->count]);
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
            select u.id user_id,
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
            return response(['messages' => ["You can't add yourself as a friend"]]);
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
        return response(['success' => true, 'messages' => ['Friend request sent successfully']]);
    }

    public function add_friend($id) {
        $request = DB::table('friends')->where('id', $id);
        $response = '';
        if ($friend = $request->get()) {
            if ($friend[0]->friend_id == Auth::id()) {
                $request->update(['status' => 1]);
                $response = ['success' => true];
            } else {
                $response = ['messages' => ['Friend request for you is not found']];
            }
        } else {
            $response = ['messages' => ['Request is not found']];
        }
        return response([$response]);
    }

    public function search_friends(Request $request) {
        $fields = $request->validate([
            'user_id' => 'integer|required',
        ]);

        $friends = DB::select('
        select u.id,
               u.name,
               u.surname,
               u.avatar
          from     
        (select u.id,
               concat(u.name, " ", u.surname) username,
               u.name,
               u.surname,
               u.avatar
          from users u 
         where u.id in (
            select (case when f.user_id = '.$fields['user_id'].' 
                      then f.friend_id
                      when f.friend_id = '.$fields['user_id'].'
                      then f.user_id
                    end) user_id
              from friends f
             where (f.user_id   = '.$fields['user_id'].'
                or f.friend_id = '.$fields['user_id'].')
               and f.status = 1   
            )) u
           where (lower(u.username) like lower("%'.$request->text.'%"))        
        ');

        if (!empty($friends)) {
            return response(['friends' => UserResource::collection($friends)]);
        }
        return response(['message_not_found' => 'Users is not found']);
    }
}

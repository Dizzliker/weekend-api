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
            select *
              from users u 
             where u.id in (
                select (case when f.user_id = '.$id.' 
                             then f.friend_id
                             when f.friend_id = '.$id.'
                             then f.user_id
                        end) user_id
                   from friends f
                  where f.user_id   = '.$id.'
                     or f.friend_id = '.$id.'
            ) 
        ');

        return UserResource::collection($friends);
    }

    public function addFriend(Request $request) {
        if (Auth::id() == $request->get('user_id') && Auth::id() == $request->get('friend_id')) {
            return response(['messages' => ['Нельзя добавить себя в друзья']]);
        }
        $fields = $request->validate([
            'user_id' => 'integer|required',
            'friend_id' => 'integer|required',
        ]);

        return DB::table('friends')->insert([
            'user_id' => $fields['user_id'],
            'friend_id' => $fields['friend_id'],
            'status' => false,
        ]);
    }
}

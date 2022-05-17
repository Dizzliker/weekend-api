<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Friend;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserApiController extends Controller
{
    public function user(Request $request) {
        $user = $request->user();

        return response([
            'user' => $user,
            'count_unread_messages' => Message::getCountUnreadMessages($user->id),
            'count_friend_requests' => Friend::getCountFriendRequests($user->id),
        ]);
    }

    public function getUserInfo($id) {
        return response(['user' => User::find($id)]);
    }

    public function getAll() {
        $users = DB::select('
            select u.id user_id,
                   u.name,
                   u.surname,
                   u.avatar,
                   u.email,
                   u.is_banned
              from users u
        ');

        return response(['users' => $users]);
    }

    public function ban($id) {
        if (auth()->user()->is_admin) {
            DB::table('users')->where('id', $id)->update(['is_banned' => true]);
            return(['success' => true]);
        }
        return response(['message' => "Access denied"]);
    }

    public function unban($id) {
        if (auth()->user()->is_admin) {
            DB::table('users')->where('id', $id)->update(['is_banned' => false]);
            return response(['success' => true]);
        }
        return response(['message' => "Access denied"]);
    }

    public function delete($id) {
        if (auth()->user()->is_admin) {
            $user = User::find($id);
            if ($user) {
                $user->delete();
                return response(['success' => true]);
            }
        }
        return response(['message' => "Access denied"]);
    }
}

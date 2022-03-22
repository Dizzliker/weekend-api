<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileApiController extends Controller
{
    public function profile($id) {
        $profile = DB::select('
            select u.id,
                   u.name,
                   u.surname,
                   u.avatar,
                   count(f.id) count_friends
              from users u
                   left join friends f 
                     on (f.user_id = u.id or f.friend_id = u.id) 
                    and status = 1
              where u.id = '.$id.'
              limit 1       
        ');
        
        return new ProfileResource($profile[0]);
    }
}

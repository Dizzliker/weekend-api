<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProfileApiController extends Controller
{
    public function profile($id) {
        $profile = DB::select('
            select u.id,
                   u.name,
                   u.surname,
                   u.avatar,
                   (select count(f.id)
                         from friends f
                        where f.user_id = '.$id.' or f.friend_id = '.$id.'
                          and f.status = 1
                   ) count_friends,
                   count(g.id) count_photos
              from users u
                    left join gallery g 
                      on g.user_id = '.$id.'
              where u.id = '.$id.'
              limit 1       
        ');

        return new ProfileResource($profile[0]);
    }

    public function change_avatar(Request $request) {
        $fields = $request->validate([
            'user_id' => 'required|integer',
            'avatar' => 'required|image|mimes:jpg,jpeg,png,svg|max:10000',
        ]);
 
        $newImageName = time().'-'.$request->user_id.'.'.$request->avatar->extension();
        $request->avatar->move(public_path('images/avatars'), $newImageName);

        $profile = DB::table('users')->where('id', $fields['user_id'])->update(['avatar' => '/images/avatars/'.$newImageName]); 
        
        if ($profile) {
            return response(['success' => true]);
        }
    }
}

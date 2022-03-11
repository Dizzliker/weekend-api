<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileApiController extends Controller
{
    public function profile($id) {
        $user = User::find($id);
        return new ProfileResource($user);
    }
}

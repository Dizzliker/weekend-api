<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsApiController extends Controller
{
    public function index() {
        return response(['posts' => Post::getFriendPosts(Auth::id())]);
    }
}

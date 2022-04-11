<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminHomeController extends Controller
{
    public function index() {
        $counts = DB::select('
            select (select count(u.id)
                      from users u) count_users,
                    (select count(p.id)
                       from posts p) count_posts,  
                    (select count(a.id)
                       from audios a) count_audios
              from dual
        ');

        return response(['counts' => $counts[0]]);
    }
}

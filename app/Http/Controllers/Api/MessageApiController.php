<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageApiController extends Controller
{
    public function send_message(Request $request) {
        $fields = $request->validate([
            'out_user_id' => 'required|integer',
            'inc_user_id' => 'required|integer',
            'text' => 'required',
        ]);

        return Message::create([
            'out_user_id' => $fields['out_user_id'],
            'inc_user_id' => $fields['inc_user_id'],
            'text' => $fields['text'],
            'read' => false,
        ]);
    }

    public function get_chat_list($id) {
        $users = DB::select('
            select (case when )
              from messages m
             where m.inc_user_id = '.$id.' or m.out_user_id = '.$id.'
        ');
    }

    public function get_chat(Request $request) {
        $fields = $request->validate([
            'out_user_id' => 'required|integer',
            'inc_user_id' => 'required|integer',
        ]);
        
        $user = DB::select('
            select u.id,
                   u.name,
                   u.surname,
                   u.avatar 
              from users u
             where u.id = '.$fields['inc_user_id'].'
             limit 1       
        ');

        $chat = DB::select('
            select m.id message_id,
                   m.inc_user_id,
                   m.out_user_id,
                   m.text,
                   m.read
              from messages m 
             where (m.out_user_id = '.$fields['out_user_id'].' and m.inc_user_id = '.$fields['inc_user_id'].')
                or (m.inc_user_id = '.$fields['out_user_id'].' and m.out_user_id = '.$fields['inc_user_id'].')
        ');

        return response([
            'user' => new UserResource($user[0]),
            'chat' => $chat,
        ]);
    }
}

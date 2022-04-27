<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageSend;
use App\Events\PrivateMessageSent;
use App\Http\Controllers\Controller;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageApiController extends Controller
{
    public function send_message(Request $request) {
        $fields = $request->validate([
            'out_user_id' => 'required',
            'inc_user_id' => 'required',
            'text' => 'required',
        ]);
    
        $message =  Message::create([
            'out_user_id' => $fields['out_user_id'],
            'inc_user_id' => $fields['inc_user_id'],
            'text' => $fields['text'],
            'read' => false,
        ]);

        PrivateMessageSent::dispatch($message);

        return new MessageResource($message);
    }

    public function get_count_messages($id) {
        return response(['count' => Message::get_count_unread_messages($id)]);
    }

    public function read_messages(Request $request) {
        $fields = $request->validate([
            'out_user_id' => 'required',
            'inc_user_id' => 'required',
        ]);

        $affected = DB::table('messages')->where([
            ['out_user_id', '=', $fields['inc_user_id']],
            ['inc_user_id', '=', $fields['out_user_id']],
            ['read', '=', 0]
        ])->update(['read' => 1]);

        if ($affected) {
            return response(['success' => true]);
        }
    }

    public function get_chat_list($id) {
        $users = DB::select('
        select u.id,
               u.name,
               u.surname,
               u.avatar,
               m.text,
               (select count(m.id)
               	  from messages m 
                 where m.out_user_id = u.id
                   and m.read = false) msg_unread_count,
               date_format(m.created_at, "%d.%m.%Y %H:%i") created_at
          from users u
               join  
        (select row_number() over(partition by t.user_id order by t.created_at desc) row_count,
               t.user_id, 
               t.text,
               t.created_at
          from   
            (select (case when m.inc_user_id = '.$id.' then m.out_user_id
                          when m.out_user_id = '.$id.' then m.inc_user_id
                    end) user_id,
                    (case when length(m.text > 20) then concat(substring(m.text, 1, 14), "...")
                          else m.text
                     end) text,
                    m.created_at
              from messages m
             where m.inc_user_id = '.$id.' or m.out_user_id = '.$id.') t) m
            on m.user_id = u.id and m.row_count = 1 
        ');

        return response(['users' => $users]);
    }

    public function get_chat(Request $request) {
        $fields = $request->validate([
            'out_user_id' => 'required',
            'inc_user_id' => 'required',
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
            select m.id,
                   m.inc_user_id,
                   m.out_user_id,
                   m.text,
                   m.read,
                   date_format(m.created_at, "%H:%i") created_at
              from messages m 
             where (m.out_user_id = '.$fields['out_user_id'].' and m.inc_user_id = '.$fields['inc_user_id'].')
                or (m.inc_user_id = '.$fields['out_user_id'].' and m.out_user_id = '.$fields['inc_user_id'].')
        ');

        return response([
            'user' => new UserResource($user[0]),
            'chat' => MessageResource::collection($chat),
        ]);
    }
}

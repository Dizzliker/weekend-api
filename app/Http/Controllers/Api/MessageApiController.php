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
    public function sendMessage(Request $request) {
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

        $messageResource = new MessageResource($message);

        PrivateMessageSent::dispatch($messageResource);

        return response(['message' => $messageResource]);
    }

    public function getCountMessages($id) {
        return response(['count' => Message::getCountUnreadMessages($id)]);
    }

    public function readMessages(Request $request) {
        $fields = $request->validate([
            'out_user_id' => 'required',
            'inc_user_id' => 'required',
        ]);

        DB::table('messages')->where([
            ['out_user_id', '=', $fields['inc_user_id']],
            ['inc_user_id', '=', $fields['out_user_id']],
            ['read', '=', 0]
        ])->update(['read' => 1]);

        
        return response(['success' => true]);
    }

    public function getChatList($id) {
        DB::statement( DB::raw( 'SET @row_number := 0'));
        $users = DB::select('
            select u.id,
                   u.name,
                   u.surname,
                   u.avatar,
                   m.text,
                   (select count(*)
                      from messages m 
                     where m.out_user_id = u.id
                       and m.read = 0) msg_unread_count,
                    date_format(m.created_at, "%d.%m.%Y %H:%i") created_at
               from users u
                    join (
                select @row_number:=CASE
                    WHEN @customer_no = t.user_id 
            			THEN @row_number + 1
                    ELSE 1
                END AS row_count,
                @customer_no:=t.user_id user_id,
                           t.text,
                           t.created_at
                      from   
                        (select (case when m.inc_user_id = '.$id.' then m.out_user_id
                                      when m.out_user_id = '.$id.' then m.inc_user_id
                                end) user_id,
                                (case when (length(m.text) > 14 and m.out_user_id = '.$id.')
                                        then concat("You: ", substring(m.text, 1, 9), "...")
                                      when (length(m.text) > 14)
                                        then concat(substring(m.text, 1, 13), "...")
                                      else m.text
                                 end) text,
                                m.created_at
                          from messages m
                         where m.inc_user_id = '.$id.' or m.out_user_id = '.$id.') t
            order by t.user_id, t.created_at desc) m
            on m.user_id = u.id and m.row_count = 1 
        ');

        return response(['users' => $users]);
    }

    public function getChat(Request $request) {
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

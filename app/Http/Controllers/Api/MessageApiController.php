<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

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
}

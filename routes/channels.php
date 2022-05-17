<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Отслеживать печатает ли пользователь сообщение
Broadcast::channel('chat.{user_id}', function ($user) {
    return ['id' => $user->id];
});

// Заявки в друзья
Broadcast::channel('friend-requests.{user_id}', function () {
    return auth()->check();
});

// Чат
Broadcast::channel('privatechat.{receiverid}', function () {
    return auth()->check();
});

// Онлайн статус юзеров
Broadcast::channel('online-users', function ($user) {
    if(auth()->check()){
        return ['id' => $user->id];
    }
});

// Посты
Broadcast::channel('post.{user_id}', function() {
    return auth()->check();
});

Broadcast::channel('post-like.{user_id}', function() {
    return auth()->check();
});

Broadcast::channel('post-delete.{user_id}', function() {
    return auth()->check();
});
<?php

use App\Http\Controllers\Api\AudioApiController;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\MessageApiController;
use App\Http\Controllers\Api\PostApiController;
use App\Http\Controllers\Api\ProfileApiController;
use App\Http\Controllers\Api\UserApiController;
use Faker\Provider\UserAgent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function() {
    // Друзья
    Route::get('/friends/{id}', [UserApiController::class, 'friends']);
    Route::post('/sendFriendRequest', [UserApiController::class, 'send_friend_request']);
    Route::get('/friendRequests/{id}', [UserApiController::class, 'friend_requests']);
    Route::get('/countFriendRequests/{id}', [UserApiController::class, 'count_friend_requests']);
    Route::get('/addFriend/{id}', [UserApiController::class, 'add_friend']);
    Route::post('/searchFriends', [UserApiController::class, 'search_friends']);
    Route::get('/countFriends/{id}', [UserApiController::class, 'count_friends']);
    // Посты
    Route::get('/post/{id}', [PostApiController::class, 'index']);
    Route::post('/post/create', [PostApiController::class, 'store']);
    Route::get('/post/{id}/delete', [PostApiController::class, 'delete']);
    // Сообщения
    Route::post('/sendMessage', [MessageApiController::class, 'send_message']);
    // Музыка
    Route::post('/addAudio', [AudioApiController::class, 'add_audio']);
    // Профиль
    Route::get('/profile/{id}', [ProfileApiController::class, 'profile']);
    Route::post('/changeAvatar', [ProfileApiController::class, 'change_avatar']);
    // Выход
    Route::post('/logout', [AuthApiController::class, 'logout']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [AuthApiController::class, 'register'])->name('register');
Route::post('/login', [AuthApiController::class, 'login'])->name('login');
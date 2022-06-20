<?php

use App\Http\Controllers\Admin\AdminHomeController;
use App\Http\Controllers\Admin\AdminPostController;
use App\Http\Controllers\Api\AudioApiController;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\FriendApiController;
use App\Http\Controllers\Api\GalleryApiController;
use App\Http\Controllers\Api\MessageApiController;
use App\Http\Controllers\Api\NewsApiController;
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
    // Пользователь
    Route::get('/user', [UserApiController::class, 'user']);
    // Новости
    Route::get('/news', [NewsApiController::class, 'index']);
    // Друзья
    Route::get('/friends/{id}', [FriendApiController::class, 'getFriends']);
    Route::post('/sendFriendRequest', [FriendApiController::class, 'sendFriendRequests']);
    Route::get('/friendRequests/{id}', [FriendApiController::class, 'getFriendRequests']);
    Route::get('/countFriendRequests/{id}', [FriendApiController::class, 'getCountFriendRequests']);
    Route::get('/addFriend/{id}', [FriendApiController::class, 'addFriend']);
    Route::post('/searchFriends', [FriendApiController::class, 'searchFriends']);
    Route::get('/countFriends/{id}', [FriendApiController::class, 'getCountFriends']);
    // Посты
    Route::get('/post/{id}', [PostApiController::class, 'index']);
    Route::post('/post/create', [PostApiController::class, 'store']);
    Route::post('/post/{id}/like', [PostApiController::class, 'like']);
    Route::post('/post/{id}/unlike', [PostApiController::class, 'unlike']);
    Route::get('/post/{id}/delete', [PostApiController::class, 'delete']);
    // Сообщения
    Route::post('/sendMessage', [MessageApiController::class, 'sendMessage']);
    Route::post('/readMessages', [MessageApiController::class, 'readMessages']);
    Route::get('/getCountMessages/{id}', [MessageApiController::class, 'getCountMessages']);
    Route::post('/getChat', [MessageApiController::class, 'getChat']);
    Route::post('/getRangedChat', [MessageApiController::class, 'getRangedChat']);
    Route::get('/getChatList/{id}', [MessageApiController::class, 'getChatList']);
    // Музыка
    Route::get('/getAllAudios', [AudioApiController::class, 'getAllAudios']);
    Route::post('/addAudio', [AudioApiController::class, 'addAudio']);
    // Профиль
    Route::get('/profile/{id}', [ProfileApiController::class, 'profile']);
    Route::post('/changeAvatar', [ProfileApiController::class, 'changeAvatar']);
    Route::get('/profile/{id}/gallery', [GalleryApiController::class, 'getProfileGallery']);
    // Фотографии
    Route::get('/gallery/{id}', [GalleryApiController::class, 'getGallery']);
    Route::post('/gallery/{id}/addComment', [GalleryApiController::class, 'addComment']);
    Route::get('/gallery/{id}/like', [GalleryApiController::class, 'likePhoto']);
    Route::get('/gallery/{id}/unlike', [GalleryApiController::class, 'unLikePhoto']);
    Route::post('/addPhotos', [GalleryApiController::class, 'addPhotos']);
    // Выход
    Route::post('/logout', [AuthApiController::class, 'logout']);
    // Все пользователи
    Route::get('/users', [UserApiController::class, 'getAll']);

    // Админка
    Route::get('/getAllPosts', [AdminPostController::class, 'get_all']);
    Route::get('/counts', [AdminHomeController::class, 'index']);
    Route::get('/user/{id}', [UserApiController::class, 'getUserInfo']);
    Route::get('/user/{id}/unban', [UserApiController::class, 'unban']);
    Route::get('/user/{id}/ban', [UserApiController::class, 'ban']);
    Route::get('/user/{id}/delete', [UserApiController::class, 'delete']);
});
Route::post('/register', [AuthApiController::class, 'register'])->name('register');
Route::post('/login', [AuthApiController::class, 'login'])->name('login');
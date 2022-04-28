<?php

namespace App\Models;

use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'birthdate',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getId() {
        return $this->name;
    }

    public function post() {
        return $this->hasMany(Post::class, 'user_id');
    }

    public static function add($fields) {
        $user = new static;
        $user->fill($fields);
        $user->save();

        return $user;
    }

    public function edit($fields) {
        $this->fill($fields);
        $this->hashPassword($fields['password']);
        $this->save();
    }

    public function hashPassword($password) {
        if ($password != null) {
            $this->password = Hash::make($password);
            $this->save();
        }
    }

    public function uploadAvatar($avatar) {
        if ($avatar == null) {return;}

        $this->removeAvatar();
        $filename = Str::random(10) . '.' . $avatar->extension();
        $avatar->storeAs('img/avatar', $filename);
        $this->avatar = $filename;
        $this->save();
    }

    public function removeAvatar() {
        if ($this->avatar != null) {
            Storage::delete('img/avatar/'. $this->avatar);
        }
    }

    public function getAvatar() {
        if ($this->avatar == null) {
            return '/img/Ava.jpg';
        }
        return '/img/avatar/' . $this->avatar;
    }

    public function remove() {
        $this->removeAvatar();
        $this->delete();
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'user_id' => $this->id,
            'name' => $this->name,
            'surname' => $this->surname,
            'avatar' => $this->avatar,
            'is_banned' => $this->is_banned,
            'count_friends' => $this->count_friends,
            'count_photos' => $this->count_photos,
        ];
    }
}

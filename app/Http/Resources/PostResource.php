<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'post_id' => $this->id,
            'user_id' => $this->user_id,
            'text' => $this->text,
            'likes' => $this->likes ? $this->likes : 0,
            'i_like' => $this->i_like ? $this->i_like : 0,
            'reposts' => $this->reposts ? $this->reposts : 0,
            'comments' => $this->comments ? $this->comments : 0,
            'created_at' => Carbon::parse($this->created_at)->format('d.m.Y H:i'),
            'updated_at' => Carbon::parse($this->updated_at)->format('d.m.Y H:i'),
        ];
    }
}

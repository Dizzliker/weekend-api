<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            'id' => $this->id,
            'inc_user_id' => $this->inc_user_id,
            'out_user_id' => $this->out_user_id,
            'text' => $this->text,
            'read' => $this->read,
            'created_at' => Carbon::parse($this->created_at, 'Asia/Yekaterinburg')->format('H:i'),
        ];
    }
}

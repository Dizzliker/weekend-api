<?php

namespace App\Events;

use App\Models\Post;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PostLiked implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $post_id;
    public $post_author_id;
    public $who_liked_id;
    public $is_liked;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($post_id, $post_author_id, $who_liked_id, $is_liked)
    {
        $this->post_id = $post_id;
        $this->post_author_id = $post_author_id;
        $this->who_liked_id = $who_liked_id;
        $this->is_liked = $is_liked;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('post-like.'.$this->post_author_id);
    }
}

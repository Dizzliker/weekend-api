import React, { Component } from "react";
import { PostService } from "../../../../services/Post";
import Popup from '../../../popup';

export default class PopupDeletePost extends Component {
    post = new PostService();

    onDeletePost(event, post_id) {
        event.preventDefault();
        this.post.delete(post_id)
            .then(res => {
                if (res.success) {
                    this.props.onClose();
                }
            })
    }
    
    render() {
        return (
            <Popup onClose={this.props.onClose}>
                <form onSubmit={(e) => {this.onDeletePost(e, this.props.post_id)}} method="post" className="flex_column ai_center jc_center">
                    <span>Are you sure want to delete the post?</span>
                    <button className="btn-auth">Delete post</button>
                </form>
            </Popup>
        );
    }
}
import React, { Component } from 'react';

export default class PostForm extends Component {
    render() {
        const {avatar} = this.props.user;

        return (
            <div className="posts__add-post flex">
                <div className="posts__add-post-avatar">
                    <a href="#">
                        <img src={avatar} className="ava-50" alt="User avatar" />
                    </a>
                </div>
                <textarea name="" className="posts__add-input" placeholder="What's news?" id="" cols="30" rows="10"></textarea>
                <div className="posts__post-actions flex jc_space-between">
                    <a href="#" className="link-attach">
                        <img src="../images/music.svg" className="icon-attach" alt="Attach music" />
                    </a>
                    <a href="#" className="link-attach">
                        <img src="../images/photo.svg" className="icon-attach" alt="Attach photo" />
                    </a>
                    <a href="#" className="link-attach">
                        <img src="../images/video.svg" className="icon-attach" alt="Attach video" />
                    </a>
                </div>
                <a href="#" className="posts__add-btn-link">
                    <img src="../images/icon-send(purple).svg" className="posts__add-btn" alt="Add post" />
                </a>
            </div>
        );
    }
}
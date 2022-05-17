import React, { Component } from 'react';
import {PostService} from '../../../services/Post';
import PostList from './post-list';

export default class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.post = new PostService();
    }

    getFormData = () => {
        let formData = new FormData();
        formData.append("user_id", this.props.cur_user_id);
        formData.append("text", this.state.text);
        return formData;
    }

    onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          this.addPost();
        }
    }

    addPost = () => {
        this.post.postData('/post/create', this.getFormData())
            .then(res => {
                if (res) {
                    this.setState({text: ''});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    render() {
        const {avatar} = this.props.user;
        const {text} = this.state;

        return (
            <>
            {(this.props.cur_user_id == this.props.user_id) &&
            <div className="posts__add-post flex">
                <div className="posts__add-post-avatar">
                    <a href="#">
                        <img src={avatar} className="ava-50" alt="User avatar" />
                    </a>
                </div>
                <textarea name="text" onChange={this.handleInputChange} value={text} 
                          className="posts__add-input" 
                          placeholder="What's news?" 
                          onKeyDown={this.onEnterPress}
                          id="" cols="30" rows="10"></textarea>
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
                    <img src="../images/icon-send(purple).svg" onClick={this.addPost} className="posts__add-btn" alt="Add post" />
                </a>
            </div>}
            <PostList cur_user_id = {this.props.cur_user_id} 
                      user_id = {this.props.user_id} 
                      user = {this.props.user} />
            </>
        );
    }
}
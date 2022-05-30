import React, { Component } from "react";
import { PostService } from "../../services/Post";
import PostUser from "../post-user/post-user";

export default class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
        this.postService = new PostService();
    }

    updateNews = () => {
        this.postService.getFriendPosts()
            .then(res => {
                if (res.posts) {
                    console.log(res.posts);
                    this.setState({posts: res.posts});
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    componentDidMount() {
        this.updateNews();
    }
    
    render() {
        const {posts} = this.state;
        const postList = posts.length > 0 ? posts.map(post => {
            return <PostUser cur_user_id={this.props.cur_user_id} post = {post}/>
        }) : null;

        return (
            <div className="profile">
                <h1>News</h1>

                <div className="posts">
                    {postList}
                </div>
            </div>
        );
    }
}
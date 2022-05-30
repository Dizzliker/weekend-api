import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PostService } from "../../services/Post";

export default class PostUser extends Component {
    constructor(props) {
        super(props);
        this.post = new PostService();
    }

    getUserId = () => {
        let formData = new FormData()
        formData.append('user_id', this.props.cur_user_id);
        return formData;
    }

    toggleLikeByPostId = (post_id, user_id, like) => {
        this.setState(state => {
            const posts = state.posts.map((post) => {
              if (post.post_id == post_id) {
                  if (user_id == this.props.cur_user_id) {
                    post.i_like = like;
                  }
                  like ? post.likes++ : post.likes--;
              }
              return post;
            });
            return {posts};
          });
    }

    onLikePost = (event, post_id) => {
        event.preventDefault();
        this.post.like(post_id, this.getUserId())
            .then(res => {
                if (res.success) {
                    this.toggleLikeByPostId(post_id, this.props.cur_user_id, true);
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    onUnlikePost = (event, post_id) => {
        event.preventDefault();
        this.post.unlike(post_id, this.getUserId())
            .then(res => {
                if (res.success) {
                    this.toggleLikeByPostId(post_id, this.props.cur_user_id, false);
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        const {avatar, name, surname, post_id, user_id, text, likes, i_like, reposts, comments, created_at} = this.props.post;

        return (
            <div className="post" key={post_id}>
                    <Link to={`/profile/${user_id}`}>
                        <img src={avatar} className="ava-70" alt="User avatar" srcSet="" />
                    </Link>
                    <div className="post__container">
                        <div className="post__header flex jc_space-between">
                            <div className="post__username flex jc_space-between">
                                <Link to={`/profile/${user_id}`}>
                                    <span className="username">{name} {surname}</span>
                                </Link>
                                <span className="date">{created_at}</span>
                            </div>
                        </div>
                        <div className="post__body">
                            {text}
                        </div>
                        <div className="post__footer flex jc_space-between">
                            <div className="post__like">
                                <form onSubmit={
                                    i_like ? (e) => {this.onUnlikePost(e, post_id)} 
                                           : (e) => {this.onLikePost(e, post_id)}} method="post">
                                    <button className="btn-like link flex ai_center">
                                    {i_like ?
                                        <img src="/images/like(purple).svg" className="icon-like" alt="Like" />
                                      : <img src="/images/like.svg" className="icon-like" alt="Like" />}
                                        <span className="text">{likes}</span>
                                    </button>
                                </form>
                            </div>
                            <div className="post__repost">
                                <span className="link flex ai_center">
                                    <img src="../images/repost.svg" className="icon-repost" alt="Repost" />
                                    <span className="text">{reposts}</span>
                                </span>
                            </div>
                            <div className="post__comment">
                                <span className="link flex ai_center">
                                    <img src="../images/comment.svg" className="icon-comment" alt="Comment" />
                                    <span className="text">{comments}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
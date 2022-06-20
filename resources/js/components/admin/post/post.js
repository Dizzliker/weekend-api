import React, { Component } from 'react';
import {PostService} from '../../../services/Post';
import { Link } from 'react-router-dom';
import RightSide from '../right-side/right-side';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
        this.post = new PostService();
    }

    updatePosts = () => {
        this.post.getAllPosts()
            .then(res => {
                if (res.posts) {
                    this.setState({posts: res.posts});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    componentDidMount() {
        this.updatePosts();
    }

    componentDidUpdate() {
        if (this.state.reload) {
            this.setState({reload: false});
            this.updatePosts();
        }
    }

    like = (event, post_id) => {
        event.preventDefault();
        this.post.like(post_id, this.getUserId())
            .then(res => {
                if (res.success) {
                    this.setState({reload: true});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    unlike = (event, post_id) => {
        event.preventDefault();
        this.post.unlike(post_id, this.getUserId())
            .then(res => {
                if (res.success) {
                    this.setState({reload: true});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    delete = (event, post_id) => {
        event.preventDefault();
        this.post.delete(post_id)
            .then(res => {
                if (res.success) {
                    this.setState({reload: true});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        const {posts} = this.state;
        const postsList = posts.length > 0 ? posts.map(post => {
            const {post_id, user_id, text, likes, i_like, reposts, comments, created_at, avatar, name, surname} = post;
            return (
                <div className="post" key={post_id}>
                    <Link to={`/profile/${user_id}`}>
                        <img src={avatar} className="ava-70" alt="User avatar" srcset="" />
                    </Link>
                    <div className="post__container">
                        <div className="post__header flex jc_space-between">
                            <div className="post__username flex jc_space-between">
                                <Link to={`/profile/${user_id}`}>
                                    <span className="username">{name} {surname}</span>
                                </Link>
                                <span className="date">{created_at}</span>
                            </div>
                            <div className="post__actions flex_center_space-between">
                                <div className="kebab">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                                <a href="#">
                                    <img src="../images/edit.svg" className="icon-edit" alt="Edit post" title="Edit post" />
                                </a>
                                <form onSubmit={(e) => {this.delete(e, post_id)}} method="post">
                                    <button className="btn-submit-icon">
                                        <img src="../images/close.svg" className="icon-delete" alt="Delete post" title="Delete post" />
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="post__body">
                            {text}
                        </div>
                        <div className="post__footer flex jc_space-between">
                            <div className="post__like">
                                {i_like ? 
                                <form onSubmit={(e) => {this.unlike(e, post_id)}} method="post">
                                    <button className="btn-like link flex ai_center">
                                        <img src="/images/like(purple).svg" className="icon-like" alt="Like" />
                                        <span className="text">{likes}</span>
                                    </button>
                                </form> :
                                <form onSubmit={(e) => {this.like(e, post_id)}} method="post">
                                    <button className="btn-like link flex ai_center">
                                        <img src="/images/like.svg" className="icon-like" alt="Like" />
                                        <span className="text">{likes}</span>
                                    </button>
                                </form>}
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
        }) : <h2>Posts is not found</h2>;
        return(
            <div className="profile flex">
                <div className="posts">
                    <h1>Admin post</h1>
                    {postsList}
                </div>
            </div>
            
        );
    }
}
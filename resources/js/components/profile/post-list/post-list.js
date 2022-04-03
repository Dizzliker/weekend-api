import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../../services/Post';
import Session from '../../../services/Session';

export default class PostList extends Component {
    state = {
        posts: [],
        reload: false,
    };

    post = new Post();

    updatePosts = () => {
        const {user_id} = this.props;
        this.post.getUserPosts(user_id)
            .then((res) => {
                if (res.posts) {
                    this.setState({posts: res.posts});
                }
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    componentDidMount() {
        this.updatePosts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.reload) {
            this.updatePosts();
            this.props.afterUpdatePosts();
        }
        if (this.state.reload || this.props.user_id != prevProps.user_id) {
            this.setState({reload: false});
            this.updatePosts();
        }
    }

    getUserId = () => {
        let formData = new FormData()
        formData.append('user_id', Session.getId());
        return formData;
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

    render() {
        const postsList = this.state.posts.map(post => {
            const {avatar, name, surname} = this.props.user;
            const {post_id, user_id, text, likes, i_like, reposts, comments, created_at} = post;
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
                                <a href="#">
                                    <img src="../images/close.svg" className="icon-delete" alt="Delete post" title="Delete post" />
                                </a>
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
        });

        return (
            <>
                {postsList}
            </>
        );
    }
}
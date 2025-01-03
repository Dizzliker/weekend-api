import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {PostService} from '../../../services/Post';
import PopupDeletePost from './popup-delete-post/popup-delete-post';

export default class PostList extends Component {
    state = {
        posts: [],
        reload: false,
        popupDeletePost: false,
        activePostId: '',
    };

    post = new PostService();

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

    listenUpdatePosts(user_id) {
        window.Echo.private(`post.${user_id}`)
              .listen('PostPublished', (e) => {
                  if (e.post) {
                    this.setState({
                        posts: [e.post, ...this.state.posts],
                    });
                  }
              });
        window.Echo.private(`post-like.${user_id}`)
                   .listen('PostLiked', (post) => {
                        if (post.who_liked_id != this.props.cur_user_id) {
                            this.toggleLikeByPostId(post.post_id, post.who_liked_id, post.is_liked);
                        }});
        window.Echo.private(`post-delete.${user_id}`)
                   .listen('PostDeleted', (post) => {
                        this.deletePostById(post.post_id);
                   });                
    }

    stopListenUpdatePosts(user_id) {
        window.Echo.private(`post.${user_id}`)
                   .stopListening('PostPublished');
        window.Echo.private(`post-like.${user_id}`)
                   .stopListening('PostLiked');  
        window.Echo.private(`post-delete.${user_id}`)
                   .stopListening('PostDeleted');
    }

    componentDidMount() {
        if (this.props.user_id) {
            this.updatePosts();
            this.listenUpdatePosts(this.props.user_id);
        }
    }

    componentDidUpdate(prevProps) {
        const {user_id} = this.props;
        if (prevProps.user_id != user_id) {
            this.updatePosts();
            this.listenUpdatePosts(user_id);
        }
    }

    componentWillUnmount() {
        this.stopListenUpdatePosts(this.props.user_id); 
    }

    getUserId = () => {
        let formData = new FormData()
        formData.append('user_id', this.props.cur_user_id);
        return formData;
    }

    deletePostById = (post_id) => {
        const posts = this.state.posts.filter((post) => post.post_id != post_id);

        this.setState({posts});
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
        const {posts, popupDeletePost, activePostId} = this.state;
        const postsList = posts.length > 0 ? posts.map((post) => {
            const {avatar, name, surname} = this.props.user;
            const {post_id, user_id, text, likes, i_like, reposts, comments, created_at} = post;
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
                            {this.props.user_id == this.props.cur_user_id && 
                            <div className="post__actions flex_center_space-between">
                            <div className="kebab">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                            <a href="#">
                                <img src="../images/edit.svg" className="icon-edit" alt="Edit post" title="Edit post" />
                            </a>
                            <img src="../images/close.svg" 
                                 onClick={() => {this.setState({activePostId: post_id, popupDeletePost: true})}} 
                                 className="icon-delete" alt="Delete post" title="Delete post" /> 
                        </div>}
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
        }): null;

        return (
            <>
                {popupDeletePost && <PopupDeletePost onClose={() => {this.setState({popupDeletePost: false})}}
                                                     post_id = {activePostId}/>}
                {postsList}
            </>
        );
    }
}
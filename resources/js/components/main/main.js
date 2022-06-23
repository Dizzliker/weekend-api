import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import Friend from '../friend/friend';
import Music from '../music';
import Sidebar from '../sidebar';
import bg from '../../img/bg.png';
import ProfileContainer from '../profile/profile-container';
import User from '../user/user';
import Gallery from '../gallery/gallery';
import MessageContainer from '../message-container/message-container';
import Redirect from '../redirect';
// Админка
import Admin from '../admin';
import Post from '../admin/post';
import AdminUser from '../admin/user';
import Notification from '../../services/Notification';
import News from '../news/news';
import AdminAudio from '../admin/audio/audio';
import AdminPhoto from '../admin/photo/photo';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countNewMessages: 0,
            countFriendRequests: 0,
            newMessagesData: [],
            usersOnline: [],
            typingUsers: [],
        }
    }

    // Канал со всеми онлайн пользователями, хранит id [{id: 1},{id: 2}]
    listenOnlineUsers = () => {
        window.Echo.join('online-users')
              .here(users => {
                this.setState({usersOnline: users});
              })
              .joining(user => {
                this.setState({usersOnline: [user, ...this.state.usersOnline]});
              })
              .leaving(user => {
                const userIds = this.state.usersOnline.filter((currentUser) => {
                    return currentUser.id != user.id;
                });
                this.setState({usersOnline: userIds});
              })
    }

    // Канал новые сообщений
    listenMessageChannel = (id) => {
      window.Echo.private('privatechat.'+id) 
            .listen('PrivateMessageSent', (e) => {
                if (e.message) {
                   this.setState({
                       countNewMessages: this.state.countNewMessages + 1,
                       newMessagesData: [...this.state.newMessagesData, e.message],
                   });
                   Notification.play();
                   Notification.setRepeatTitle('New messages');
               }
            });
    }

    // Канал заявок в друзья
    listenFriendRequests = (id) => {
        window.Echo.private('friend-requests.'+id)
              .listen('FriendRequestSent', request => {
                if (request.user_id) {
                    this.setState({countFriendRequests: this.state.countFriendRequests+1});
                }
              });
    }

    listenAllChannels(userId) {
        this.listenMessageChannel(userId);
        this.listenOnlineUsers();
        this.listenFriendRequests(userId);
    }

    componentDidMount() {
      const {id} = this.props.user;
      if (id) {
        this.listenAllChannels(id);
      }         
    }

    componentDidUpdate(prevProps) {
      const {id} = this.props.user;
        if (prevProps.user.id != this.props.user.id) {
            this.listenAllChannels(id);
        }
    }

    render() {
        const {user, minusReadedMessages} = this.props;
        const {newMessagesData, usersOnline, countNewMessages} = this.state;
        const countFriendRequests = +this.props.countFriendRequests + this.state.countFriendRequests;
        const countMessages = +this.props.countMessages + countNewMessages;
        const {id, is_admin} = user;
        const bgStyle = {
            width: '100%', 
            height: '100vh',  
            backgroundImage:`url(${bg})`,
        };
        return (
            <div className="bg" style={bgStyle}>
                <div className="main flex">
                    <Sidebar user={user}
                             countFriendRequests = {countFriendRequests}
                             countMessages = {countMessages}/>
                    <Routes>
                        <Route path="*"            element={<Redirect cur_user_id={id} auth={true}/>}/>
                        <Route path="profile/:id"  element={<ProfileContainer user={user} 
                                                                              usersOnline = {usersOnline}/>}/>
                        <Route path="news"         element={<News cur_user_id={id} user={user}/>}/>                                                      
                        <Route path="messages/:id" element={<MessageContainer countMessages = {countMessages} 
                                                                              usersOnline = {usersOnline}
                                                                              newMessagesData = {newMessagesData}
                                                                              minusReadedMessages = {minusReadedMessages}
                                                                              cur_user_id={id}/>}/>
                        <Route path="friends"      element={<Friend cur_user_id = {id}
                                                                    countFriendRequests = {countFriendRequests}/>}/>
                        <Route path="users"        element={<User />}/>
                        <Route path="audio"        element={<Music isAdmin={is_admin}/>}/>
                        <Route path="photos"       element={<Gallery cur_user_id = {id}/>}/>
                        {is_admin &&
                        <>
                            <Route path="admin" element={<Admin />}/>
                            <Route path="admin/posts" element={<Post />}/>
                            <Route path="admin/users" element={<AdminUser />}/> 
                            <Route path="admin/audio" element={<AdminAudio/>}/>
                            <Route path="admin/photos" element={<AdminPhoto />}></Route>
                        </>}
                    </Routes>
                </div>
            </div>
        );
    }
}
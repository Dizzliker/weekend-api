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

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countMessages: 0,
            countFriendRequests: 0,
        }
    }

    listenMessageChannel = (id) => {
      window.Echo.private('privatechat.'+id) 
                 .listen('PrivateMessageSent', (e) => {
                     console.log(e);
                 })
                 .listenForWhisper('typing', (e) => {
                     console.log(e);
                 });
    }

    componentDidMount() {
      const {id} = this.props.user;
      if (id) {
        this.listenMessageChannel(id);
      }         
    }

    componentDidUpdate(prevProps) {
      const {id} = this.props.user;
        if (prevProps.user.id != this.props.user.id) {
            this.listenMessageChannel(id);
        }
    }

    render() {
        const {user, countFriendRequests, countMessages} = this.props;
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
                        <Route path="*"            element={<Redirect cur_user_id={id}/>}/>
                        <Route path="profile/:id"  element={<ProfileContainer user={user}/>}/>
                        <Route path="messages/:id" element={<MessageContainer countMessages = {countMessages} cur_user_id={id}/>}/>
                        <Route path="friends"      element={<Friend cur_user_id = {id}
                                                                    countFriendRequests = {countFriendRequests}/>}/>
                        <Route path="users"        element={<User />}/>
                        <Route path="audio"        element={<Music/>}/>
                        <Route path="photos"       element={<Gallery cur_user_id = {id}/>}/>
                        {is_admin &&
                        <>
                            <Route path="admin" element={<Admin />}/>
                            <Route path="admin/posts" element={<Post />}/>
                            <Route path="admin/users" element={<AdminUser />}/> 
                        </>}
                    </Routes>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Friend from '../friend/friend';
import Music from '../music';
import Sidebar from '../sidebar';
import bg from '../../img/bg.png';
import ProfileContainer from '../profile/profile-container';
import User from '../user/user';
import Gallery from '../gallery/gallery';
import MessageContainer from '../message-container/message-container';
// Админка
import Admin from '../admin';
import Post from '../admin/post';
import AdminUser from '../admin/user';

export default class Main extends Component {
    render() {
        const bgStyle = {
            width: '100%', 
            height: '100vh',  
            backgroundImage:`url(${bg})`,
        };

        return (
            <div className="bg" style={bgStyle}>
                <div className="main flex">
                    <Sidebar user={this.props.user}
                             countFriendRequests = {this.props.countFriendRequests}
                             countMessages = {this.props.countMessages}/>
                    <Routes>
                        <Route path="profile/:id" element={<ProfileContainer user={this.props.user}/>}/>
                        <Route path="messages/:id" element={<MessageContainer countMessages = {this.props.countMessages}/>}/>
                        <Route path="friends"  element={<Friend countFriendRequests = {this.props.countFriendRequests}/>}/>
                        <Route path="users" element={<User />}/>
                        <Route path="audio"   element={<Music/>}/>
                        <Route path="photos" element={<Gallery />}/>
                        {this.props.user.is_admin ? 
                        <>
                            <Route path="admin" element={<Admin />}/>
                            <Route path="admin/posts" element={<Post />}/>
                            <Route path="admin/users" element={<AdminUser />}/> 
                        </>
                        : null}
                    </Routes>
                </div>
            </div>
        );
    }
}
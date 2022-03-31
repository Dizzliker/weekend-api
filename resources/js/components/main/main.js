import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import Friend from '../friend/friend';
import Message from '../message/message';
import Music from '../music';
import Sidebar from '../sidebar';
import bg from '../../img/bg.png';
import ProfileContainer from '../profile/profile-container';
import User from '../user/user';
import Gallery from '../gallery/gallery';
import MessageContainer from '../message-container/message-container';

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
                    <Sidebar countFriendRequests = {this.props.countFriendRequests}
                             countMessages = {this.props.countMessages}/>
                    <Routes>
                        <Route path="profile/:id" element={<ProfileContainer />}/>
                        <Route path="messages/:id" element={<MessageContainer countMessages = {this.props.countMessages}/>}/>
                        <Route path="friends"  element={<Friend countFriendRequests = {this.props.countFriendRequests}/>}/>
                        <Route path="users" element={<User />}/>
                        <Route path="music"   element={<Music/>}/>
                        <Route path="photos" element={<Gallery />}/>
                    </Routes>
                </div>
            </div>
        );
    }
}
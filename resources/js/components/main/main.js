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
import Echo from 'laravel-echo';
import Cookie from '../../services/Cookie';
// Админка
import Admin from '../admin';
import Post from '../admin/post';
import AdminUser from '../admin/user';
import { FriendService } from '../../services/Friend';
import { ChatService } from '../../services/Chat';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countMessages: 0,
            countFriendRequests: 0,
        }
        this.friend = new FriendService();
        this.chat = new ChatService();
    }

    getCountFriendRequests = (id) => {
      this.friend.getCountRequests(id)
          .then(res => {
            if (res.count) {
              this.setState({countFriendRequests: res.count});
            }
          })
          .catch(error => {
            console.warn(error);
          });
    }

    getCountMessages = (id) => {
      this.chat.getCountMessages(id)
          .then(res => {
            if (res) {
              this.setState({countMessages: res.count});
            }
          })
          .catch(error => {
            console.warn(error);
          });
    }

    getEcho() {
      return new Echo({
          broadcaster: 'pusher',
          key: process.env.MIX_PUSHER_APP_KEY,
          cluster: process.env.MIX_PUSHER_APP_CLUSTER,
          authEndpoint: "/broadcasting/auth",
          auth: {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${Cookie.getToken()}`,
              csrfToken: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
          },
          forceTLS: true,
      });
    }

    componentDidMount() {
      const {id} = this.props.user;
      if (id) {
        this.getCountMessages(id);
        this.getCountFriendRequests(id);
      }

      window.Pusher = require('pusher-js');

      window.Echo = new Echo({
          broadcaster: 'pusher',
          key: process.env.MIX_PUSHER_APP_KEY,
          cluster: process.env.MIX_PUSHER_APP_CLUSTER,
          forceTLS: true,
          wsHost: window.location.hostname,
          wsPort: 6001,
      });

      window.Echo.join(`chat`)
            .here((users) => {
                console.log(users);
            })
            .joining((user) => {
                console.log(user.name);
            })
            .leaving((user) => {
                console.log(user.name);
            })
            .error((error) => {
                console.error(error);
            });         
    }

    componentDidUpdate(prevProps) {
      const {id} = this.props.user;
        if (prevProps.user.id != this.props.user.id) {
            this.getCountMessages(id);
            this.getCountFriendRequests(id);
        }
    }

    render() {
        const {user} = this.props;
        const {id, is_admin} = user;
        const {countFriendRequests, countMessages} = this.state;
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
                        <Route path="photos"       element={<Gallery />}/>
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
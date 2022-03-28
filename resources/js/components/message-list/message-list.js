import React, { Component } from 'react';
import { ChatService } from '../../services/Chat';
import Session from '../../services/Session';
import { Link } from 'react-router-dom';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
            reload: false,
        };
        this.chatService = new ChatService();
    }

    componentDidMount() {
        this.getChatList();
    }

    getChatList = () => {
        this.chatService.getChatList(Session.getId())
            .then(res => {
                if (res.users) {
                    this.setState({chatList: res.users});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        const messageList = this.state.chatList.map(user => {
            return (
                <div className="message__user-body" key={user.id}>
                    <Link to={`/messages/${user.id}`}>
                        <div className="message__user-container">
                            <div className="message__user-ava">
                                <img src={user.avatar} className="ava-50" alt="User avatar" />
                            </div>
                            <div className="message__user-info">
                                <div className="message__name-container">
                                    <span className="message__user-name">{user.name} {user.surname}</span>
                                    <span className="message__last-message">{user.text}</span>
                                </div>
                                <span className="message__send-time">{user.created_at}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            );
        });

        return (
            <div className="message__user-list flex_column">
                <div className="search-box">
                    <input type="text" className="input-search" placeholder="Search" />
                    <img src="../images/search.svg" className="icon-search" alt="Search" />
                </div> 
                {messageList}
            </div>
        );
    }
}
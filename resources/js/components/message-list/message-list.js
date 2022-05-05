import React, { Component } from 'react';
import { ChatService } from '../../services/Chat';
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
        window.Echo.join('plchat')
              .here((users) => {
                   console.log('online',users);
              })
              .joining((user) => {
                  console.log('joining',user.name);
              })
              .leaving((user) => {
                  console.log('leaving',user.name);
              });

        this.updateChatList();
    }

    updateChatList = () => {
        if (this.props.cur_user_id) {
            this.chatService.getChatList(this.props.cur_user_id)
                .then(res => {
                    if (res.users) {
                        this.setState({chatList: res.users});
                    }
                })
                .catch(error => {
                    console.warn(error);
                });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.reload 
        || (prevProps.countMessages != this.props.countMessages) 
        || (prevProps.cur_user_id != this.props.cur_user_id)) {
            this.props.afterReloadChatList();
            this.updateChatList();
        }
    }

    render() {
        const messageList = this.state.chatList.map(user => {
            return (
                <div className="message__user-body" key={user.id}>
                    <Link to={`/messages/${user.id}`}>
                        <div className="message__user-container">
                            <div className="message__user-ava">
                                <img src={user.avatar} className="ava-50" alt="User avatar" />
                                <div className={`status offline`}></div>
                            </div>
                            <div className="message__user-info">
                                <div className="message__name-container">
                                    <span className="message__user-name">{user.name} {user.surname}</span>
                                    <span className="message__last-message">{user.text}</span>
                                </div>
                                <div className="flex_column ai_flex-end">
                                    <span className="message__send-time">{user.created_at}</span>
                                    {user.msg_unread_count ? 
                                    <span className="message_unread-count">
                                        +{user.msg_unread_count}
                                    </span> : null}
                                </div>
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
import React, { Component } from 'react';
import { ChatService } from '../../services/Chat';
import { Link } from 'react-router-dom';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatList: [],
            firstReload: false,
            typingUsers: [],
        };
        this.chatService = new ChatService();
    }

    componentDidMount() {
        this.updateChatList();
        this.listenUserTyping();
    }

    getCuttedString(str, cutToNumber) {
        if (str.length > +cutToNumber) {
            return str.substring(0, +cutToNumber)+'...';
        }
        return str;
    }

    readAllMessages(userId) {
        if (userId) {
            const chatList = this.state.chatList.map(user => {
                if (userId == user.id) {
                    // Вычесть прочитанные сообщения из сайдбара
                    this.props.minusReadedMessages(user.msg_unread_count);
                    user.msg_unread_count = 0;
                }
                return user;
            });
            this.setState({chatList});
            this.props.afterReadMessages();
        }
    }

    updateAfterOutMessage() {
        const {newOutMessage} = this.props;
        if (newOutMessage) {
            const chatList = this.state.chatList.map(user => {
                const {inc_user_id, text} = newOutMessage;
                if (inc_user_id == user.id) {
                    user.text = 'You: '+this.getCuttedString(text, 9);
                }
                return user;
            });
            this.setState({chatList});
        }
    }

    updateLastSentMessage() {
        const chatList = this.state.chatList.map(user => {
            const lastIndex = +this.props.newMessagesData.length - 1;
            const newMessagesData = this.props.newMessagesData[lastIndex];
            const {out_user_id, text} = newMessagesData;
            if (out_user_id == user.id) {
                user.text = this.getCuttedString(text, 14);
                user.msg_unread_count++;
            }
            return user;
        });
        this.setState({chatList});
    }

    updateTypingStatus(userId) {
        setTimeout(() => {
            const typingUsers = this.state.typingUsers.filter(currentUserId => {
                return currentUserId != userId;
            });
            this.setState({typingUsers});
        }, 3000);
    }

    listenUserTyping() {
        const {usersOnline, cur_user_id} = this.props;
        if (usersOnline.length <= 0) return;
        window.Echo.join(`chat.${cur_user_id}`)
            .listenForWhisper('typing', (user) => {
                const {typingUsers} = this.state;
                if (typingUsers.length > 0) {
                    if (!typingUsers.includes(user.id)) {
                        this.setState({typingUsers: [...typingUsers, user.id]});
                    }
                } else {
                    this.setState({typingUsers: [...typingUsers, user.id]});
                }
                this.updateTypingStatus(user.id);
            });
    }

    updateOnlineStatus = () => {
        if (this.state.chatList.length > 0) {
            const chatList = this.state.chatList.map(user => {
                let onlineStatus = false;
                this.props.usersOnline.map((currentUser) => {
                    if (currentUser.id == user.id) {
                        onlineStatus = true;
                        return;
                    }
                });
                user.online = onlineStatus;
                return user;
            });
            this.setState({chatList});
        }
    }

    checkUserTyping(userId) {
        const {typingUsers} = this.state;
        if (typingUsers.length > 0) {
            if (typingUsers.includes(+userId)) {
                return true;
            }
        }
        return false;
    }

    updateChatList = () => {
        if (this.props.cur_user_id) {
            this.chatService.getChatList(this.props.cur_user_id)
                .then(res => {
                    if (res.users) {
                        this.setState({chatList: res.users, firstReload: true});
                        this.updateOnlineStatus();
                    }
                })
                .catch(error => {
                    console.warn(error);
                });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cur_user_id != this.props.cur_user_id) {
            this.updateChatList();
        }
        if (prevProps.usersOnline.length != this.props.usersOnline.length) {
            this.updateOnlineStatus();
            this.listenUserTyping();
        }
        if (prevProps.newMessagesData.length != this.props.newMessagesData.length) {
            this.updateLastSentMessage();
        }
        if (prevProps.newOutMessage != this.props.newOutMessage) {
            this.updateAfterOutMessage();
        }
        if (this.props.needRead && this.props.readedUserId) {
            this.readAllMessages(this.props.readedUserId);
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
                                <div className={`status ${user.online ? 'online' : 'offline'}`}></div>
                            </div>
                            <div className="message__user-info">
                                <div className="message__name-container">
                                    <span className="message__user-name">{user.name} {user.surname}</span>
                                    {this.checkUserTyping(user.id) ?
                                      <span className="message__last-message">writing...</span>
                                    : <span className="message__last-message">{user.text}</span>}
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
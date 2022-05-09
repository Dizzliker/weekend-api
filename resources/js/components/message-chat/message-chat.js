import React, { Component } from 'react';
import { ChatService } from '../../services/Chat';
import { Link } from 'react-router-dom';
import Spinner from '../spinner';

export default class MessageChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            text: '',
            companion: {
                user_id: undefined,
                name: 'Not',
                surname: 'Found',
                avatar: '/images/Ava.jpg',
            },
            online: false,
            chat: [],
            read: false,
        };
        this.chatBox = React.createRef();
        this.chatService = new ChatService();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getChatUsersId = () => {
        let formData = new FormData();
        formData.append('out_user_id', this.props.cur_user_id);
        formData.append('inc_user_id', this.props.url_user_id);
        return formData;
    }

    readMessages = () => {
        this.chatService.readMessages(this.getChatUsersId())
            .then(res => {
                if (res) {
                    this.setState({read: false});
                }
            })
            .catch(error => {
               console.warn(error);
            });
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Добавляются ли в список новые элементы?
        // Запоминаем значение прокрутки, чтобы использовать его позже.
        if (prevState.chat.length < this.state.chat.length) {
          const list = this.chatBox.current;
          return list.scrollHeight - list.scrollTop;
        }
        return null;
      }

    updateAfterNewMessage() {
        const lastIndex = +this.props.newMessagesData.length - 1;
        if (this.props.newMessagesData[lastIndex].out_user_id == this.props.url_user_id) {
            const {newMessagesData} = this.props;
            const newMessage = newMessagesData[+newMessagesData.length - 1];
            if (newMessage) {
                this.setState({chat: [...this.state.chat, newMessage]});
            }
        }
    }

    updateOnlineStatus() {
        const {usersOnline, url_user_id} = this.props;
        let online = false;
        if (usersOnline.length > 0 && url_user_id) {
            if (usersOnline.includes(+url_user_id)) {
                online = true;
            }
        }
        this.setState({online: online});
    }

    updateChat = () => {
        if (this.props.url_user_id != 0 
        && this.props.cur_user_id) {
            this.chatService.get(this.getChatUsersId())
                .then(res => {
                    if (res) {
                        this.setState({companion: res.user, chat: res.chat, loading: false, read: true});    
                        this.updateOnlineStatus();
                        this.readMessages();
                    }
                })
                .catch(error => {
                    console.warn(error);
                });
        }
    }

    componentDidMount() {
        this.updateChat();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.url_user_id != prevProps.url_user_id)
        || prevProps.cur_user_id != this.props.cur_user_id) {
            this.updateChat();
        }
        if (prevProps.newMessagesData.length != this.props.newMessagesData.length) {
            this.updateAfterNewMessage();
        }
        if (prevProps.usersOnline.length != this.props.usersOnline.length) {
            this.updateOnlineStatus();
        }
        if (snapshot !== null) {
            const list = this.chatBox.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }
    }

    getFormData = () => {
        let formData = new FormData();
        formData.append('out_user_id', this.props.cur_user_id);
        formData.append('inc_user_id', this.props.url_user_id);
        formData.append('text', this.state.text);
        return formData;
    }

    onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          this.sendMessage(e);
        }
    }

    sendMessage = (event) => {
        event.preventDefault();
        if (this.state.text.trim() != '') {
            this.chatService.sendMessage(this.getFormData())
            .then(res => {
                if (res) {
                    this.setState({text: '', chat: [...this.state.chat, res]});
                }
            })
            .catch(error => {
                console.warn(error);
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({[name]: value});
    }

    render() {
        const {chat, text, loading, online} = this.state;
        const {user_id, name, surname, avatar} = this.state.companion;
        const messageBox = chat.length > 0 ? chat.map(message => {
            if (message.out_user_id == this.props.url_user_id) {
                return (
                    <div className="message__msg message__msg-incoming" key={message.id}>
                        <Link to={`/profile/${user_id}`}>
                            <img src={avatar} className="ava-35" alt="" />
                        </Link>
                        <div className="details">
                            <p className="msg-text">{message.text}</p>
                        </div>
                        <time className="chat msg-time">{message.created_at}</time>
                    </div>
                );
            } else {
                return (
                    <div className="message__msg message__msg-outgoing" key={message.id}>
                        <time className="chat msg-time">{message.created_at}</time>
                        <div className="details">
                            <p className="msg-text">{message.text}</p>
                        </div>
                    </div>
                );    
            }
        }) : null;
        
        return (
            <>
            {(this.props.url_user_id != 0) ?
            <div className="message__chat-container flex_column jc_space-between">
                {loading && <Spinner />}
                <div className="message__chat-header flex_center_center">
                    <div className="message__header-container flex ai_center">
                        <div className="message__header-ava">
                            <Link to={`/profile/${user_id}`}>
                                <img src={avatar} className="ava-50" alt="User avatar" />
                                <div className={`status ${online ? 'online' : 'offline'}`}></div>
                            </Link>
                        </div>
                        <div className="message__header-info flex">
                            <div className="message__header-user flex_column">
                                <Link to={`/profile/${user_id}`}>
                                    <span className="username">{name} {surname}</span>
                                </Link>
                                <span className="message__header-online">
                                    {online ? 'Online' : 'Offline'}
                                </span>
                            </div>
                            <div className="message__header-actions flex_center_space-between">
                                <img src="../images/search.svg" className="icon-search" alt="Search" />
                                <div className="kebab gray">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message__chat-box" ref={this.chatBox}>
                    {messageBox}
                </div>
                <form onSubmit={this.sendMessage} method="post" className="message__form-send-msg flex_center_center">
                    <div className="message__form-container flex ai_center">
                        <textarea name="text" className="message__input-field" 
                                  onKeyDown={this.onEnterPress}
                                  value={text} 
                                  onChange={this.handleInputChange} placeholder="Send your message"
                                  autoFocus={true} id=""></textarea>
                        
                        <div className="message__form-details flex_center_space-between">
                            <a href="#">
                                <img src="../images/music.svg" alt="Attach music" />
                            </a>
                            <a href="#">
                                <img src="../images/photo.svg" alt="Attach photo" />
                            </a>
                            <a href="#">
                                <img src="../images/video.svg" alt="Attach video" />
                            </a>
                        </div>
                        <button className="message__btn-send flex_center_center">
                            <img src="../images/icon-send.svg" alt="Send message" />
                        </button>
                    </div>
                </form>
            </div> : 
            <div className="message__chat-container flex_center_center">
                <span>Select user for start chating</span>
            </div>
            }
            </>
        );
    }
}
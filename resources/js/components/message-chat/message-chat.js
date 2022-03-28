import React, { Component } from 'react';
import { ChatService } from '../../services/Chat';
import { Link } from 'react-router-dom';
import Session from '../../services/Session';
import Spinner from '../spinner';

export default class MessageChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            text: '',
            companion: {},
            chat: [],
            chatList: [],
            reload: false,
        };
        this.chatService = new ChatService();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    getChatUsersId = () => {
        let formData = new FormData();
        formData.append('out_user_id', Session.getId());
        formData.append('inc_user_id', this.props.user_id);
        return formData;
    }

    updateChat = () => {
        if (this.props.user_id != 0) {
            this.chatService.get(this.getChatUsersId())
                .then(res => {
                    if (res) {
                        this.setState({companion: res.user, chat: res.chat, reload: false, loading: false});
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

    componentDidUpdate(prevProps) {
        if ((this.props.user_id != prevProps.user_id) || this.state.reload) {
            this.updateChat();
        }
    }

    getFormData = () => {
        let formData = new FormData();
        formData.append('out_user_id', Session.getId());
        formData.append('inc_user_id', this.props.user_id);
        formData.append('text', this.state.text);
        return formData;
    }

    sendMessage = (event) => {
        event.preventDefault();
        this.chatService.sendMessage(this.getFormData())
            .then(res => {
                if (res) {
                    this.setState({text: '', reload: true});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({[name]: value});
    }

    render() {
        const {chat, text, loading} = this.state;
        const {user_id, name, surname, avatar} = this.state.companion;
        const messageBox = chat.length > 0 ? chat.map(message => {
            if (message.out_user_id == this.props.user_id) {
                return (
                    <div className="message__msg message__msg-incoming" key={message.message_id}>
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
                    <div className="message__msg message__msg-outgoing" key={message.message_id}>
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
            {(this.props.user_id != 0) ?
            <div className="message__chat-container">
                {loading && <Spinner />}
                <div className="message__chat-header flex_center_center">
                    <div className="message__header-container flex ai_center">
                        <div className="message__header-ava">
                            <Link to={`/profile/${user_id}`}>
                                <img src={avatar} className="ava-50" alt="User avatar" />
                                <div className="online-status"></div>
                            </Link>
                        </div>
                        <div className="message__header-info flex">
                            <div className="message__header-user flex_column">
                                <Link to={`/profile/${user_id}`}>
                                    <span className="username">{name} {surname}</span>
                                </Link>
                                <span className="message__header-online">Was online today at 14:37</span>
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
                <div className="message__chat-box">
                    {messageBox}
                </div>
                <form onSubmit={this.sendMessage} method="post" className="message__form-send-msg flex_center_center">
                    <div className="message__form-container flex ai_center">
                        <textarea name="text" className="message__input-field" value={text} onChange={this.handleInputChange} placeholder="Send your message" id=""></textarea>
                        
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
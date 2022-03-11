import React, { Component } from 'react';

export default class MessageChat extends Component {
    render() {
        return (
            <div className="message__chat-container">
                <div className="message__chat-header flex_center_center">
                    <div className="message__header-container flex ai_center">
                        <div className="message__header-ava">
                            <a href="#">
                                <img src="../images/Ava.jpg" className="ava-50" alt="User avatar" />
                                <div className="online-status"></div>
                            </a>
                        </div>
                        <div className="message__header-info flex">
                            <div className="message__header-user flex_column">
                                <a href="#">
                                    <span className="username">Afanyakenso Alexander</span>
                                </a>
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
                    <div className="message__msg message__msg-outgoing">
                        <time className="chat msg-time">13:00</time>
                        <div className="details">
                            <p className="msg-text">Hello world</p>
                        </div>
                    </div>
                    <div className="message__msg message__msg-incoming">
                        <a href="#">
                            <img src="../images/Ava.jpg" className="ava-35" alt="" />
                        </a>
                        <div className="details">
                            <p className="msg-text">asfasfasf</p>
                        </div>
                        <time className="chat msg-time">12:57</time>
                    </div>
                </div>
                <div className="message__form-send-msg flex_center_center">
                    <div className="message__form-container flex ai_center">
                        <textarea name="msg" className="message__input-field" placeholder="Send your message" id=""></textarea>
                        
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
                        <a href="#">
                            <div className="message__btn-send flex_center_center">
                                <img src="../images/icon-send.svg" alt="Send message" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
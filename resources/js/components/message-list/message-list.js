import React, { Component } from 'react';

export default class MessageList extends Component {
    state = {
        messageListData: [
            {
                id: 1,
                username: 'Afanyasenko Alexander',
                avatar: '../images/Ava.jpg',
                message: 'Hello! Im using Weekend!',
                time: '13:57',
                link: '#',
            },
            {
                id: 2,
                username: 'Afanyasenko Alexander',
                avatar: '../images/Ava.jpg',
                message: 'Hello! Im using Weekend!',
                time: '13:57',
                link: '#',
            }
        ],
    }

    render() {
        const messageList = this.state.messageListData.map((msg) => {
            return (
                <div className="message__user-body" key={msg.id}>
                    <a href={msg.link}>
                        <div className="message__user-container">
                            <div className="message__user-ava">
                                <img src={msg.avatar} className="ava-50" alt="User avatar" />
                            </div>
                            <div className="message__user-info">
                                <div className="message__name-container">
                                    <span className="message__user-name">{msg.username}</span>
                                    <span className="message__last-message">{msg.message}</span>
                                </div>
                                <span className="message__send-time">{msg.time}</span>
                            </div>
                        </div>
                    </a>
                </div>
            );
        });

        return (
            <div className="message__user-list flex_column">
                <div className="search-box">
                    <input type="text" className="input-search" placeholder="Search" />
                    <img src=".../images/search.svg" className="icon-search" alt="Search" />
                </div> 
                {messageList}
            </div>
        );
    }
}
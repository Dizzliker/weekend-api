import React, { Component } from 'react';
import MessageChat from '../message-chat';
import MessageList from '../message-list/message-list';

export default class Message extends Component {
    render() {
        return (
        <div className="message">
            <MessageList />
            <MessageChat user_id = {this.props.user_id}/>
        </div>
        );
    }
}
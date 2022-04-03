import React, { Component } from 'react';
import MessageChat from '../message-chat';
import MessageList from '../message-list/message-list';

export default class Message extends Component {
    state = {
        reload: false,
    };

    render() {
        return (
        <div className="message">
            <MessageList reload={this.state.reload}
                         afterReloadChatList={() => {this.setState({reload: false})}}/>
            <MessageChat user_id = {this.props.user_id}
                         countMessages = {this.props.countMessages}
                         reloadChatList = {() => {this.setState({reload: true})}}/>
        </div>
        );
    }
}
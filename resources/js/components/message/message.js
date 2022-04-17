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
                         cur_user_id = {this.props.cur_user_id}
                         countMessages = {this.props.countMessages}
                         afterReloadChatList={() => {this.setState({reload: false})}}/>
            <MessageChat url_user_id = {this.props.url_user_id}
                         cur_user_id = {this.props.cur_user_id}
                         countMessages = {this.props.countMessages}
                         reloadChatList = {() => {this.setState({reload: true})}}/>
        </div>
        );
    }
}
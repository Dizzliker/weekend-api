import React, { Component } from 'react';
import MessageChat from '../message-chat';
import MessageList from '../message-list/message-list';

export default class Message extends Component {
    state = {
        reload: false,
    };
    
    render() {
        const {cur_user_id, url_user_id, newMessagesData, countMessages, usersOnline} = this.props;

        return (
        <div className="message">
            <MessageList reload={this.state.reload}
                         cur_user_id = {cur_user_id}
                         countMessages = {countMessages}
                         usersOnline = {usersOnline}
                         newMessagesData = {newMessagesData}
                         afterReloadChatList={() => {this.setState({reload: false})}}/>
            <MessageChat url_user_id = {url_user_id}
                         cur_user_id = {cur_user_id}
                         usersOnline = {usersOnline}
                         countMessages = {countMessages}
                         reloadChatList = {() => {this.setState({reload: true})}}/>
        </div>
        );
    }
}
import React, { Component } from 'react';
import MessageChat from '../message-chat';
import MessageList from '../message-list/message-list';

export default class Message extends Component {
    state = {
        message: null,
    }

    render() {
        const {cur_user_id, url_user_id, newMessagesData, countMessages, usersOnline} = this.props;
        
        return (
        <div className="message">
            <MessageList cur_user_id = {cur_user_id}
                         usersOnline = {usersOnline}
                         newMessagesData = {newMessagesData}
                         newOutMessage = {this.state.message} />
            <MessageChat url_user_id = {url_user_id}
                         cur_user_id = {cur_user_id}
                         usersOnline = {usersOnline}
                         newMessagesData = {newMessagesData}
                         updateAfterOutMessage = {(message) => {
                            this.setState({message});
                         }} />
        </div>
        );
    }
}
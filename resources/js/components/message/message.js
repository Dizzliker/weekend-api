import React, { Component } from 'react';
import MessageChat from '../message-chat';
import MessageList from '../message-list/message-list';

export default class Message extends Component {
    state = {
        message: null,
        readedUserId: null,
        needRead: null,
    }

    render() {
        const {cur_user_id, url_user_id, newMessagesData, countMessages, usersOnline, minusReadedMessages} = this.props;
        const {readedUserId, needRead, message} = this.state;
        
        return (
        <div className="message">
            <MessageList cur_user_id = {cur_user_id}
                         usersOnline = {usersOnline}
                         newMessagesData = {newMessagesData}
                         newOutMessage = {message}
                         readedUserId = {readedUserId}
                         needRead = {needRead}
                         minusReadedMessages={minusReadedMessages}
                         afterReadMessages = {() => {this.setState({needRead: false})}} />
            <MessageChat url_user_id = {url_user_id}
                         cur_user_id = {cur_user_id}
                         usersOnline = {usersOnline}
                         newMessagesData = {newMessagesData}
                         updateAfterOutMessage = {(message) => {
                            this.setState({message});
                         }} 
                         readAllMessagesInChatList={(userId) => {
                             this.setState({readedUserId: userId, needRead: true});
                         }}/>
        </div>
        );
    }
}
import React, { Component } from 'react';
import FriendList from '../friend-list/friend-list';
import RightSide from './right-side';
import { FriendService } from '../../services/Friend';
import Session from '../../services/Session';

export default class Friend extends Component {
    render() {
        return (
        <div className="friend">
            <FriendList />
            <RightSide countRequests = {this.props.countFriendRequests}/>
        </div>
        );
    }
}
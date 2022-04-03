import React, { Component } from 'react';
import FriendList from '../friend-list/friend-list';
import RightSide from './right-side';

export default class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relaod: false,
        };
    }

    render() {
        return (
        <div className="friend">
            <FriendList reload = {this.state.reload}
                        afterReload = {() => {this.setState({reload: false})}}/>
            <RightSide afterAcceptRequest = {() => {this.setState({reload: true})}} 
                       countRequests = {this.props.countFriendRequests}/>
        </div>
        );
    }
}
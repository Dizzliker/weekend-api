import React, { Component } from 'react';
import FriendList from '../friend-list/friend-list';
import RightSide from './right-side';

export default class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false,
        };
    }

    render() {
        return (
        <div className="friend">
            <FriendList reload = {this.state.reload}
                        cur_user_id = {this.props.cur_user_id}
                        afterReload = {() => {this.setState({reload: false})}}/>
            <RightSide afterAcceptRequest = {() => {this.setState({reload: true})}} 
                       cur_user_id = {this.props.cur_user_id}
                       countRequests = {this.props.countFriendRequests}/>
        </div>
        );
    }
}
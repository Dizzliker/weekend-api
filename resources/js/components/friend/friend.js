import React, { Component } from 'react';
import FriendList from '../friend-list/friend-list';
import RightSide from './right-side';
import { FriendService } from '../../services/Friend';
import Session from '../../services/Session';

export default class Friend extends Component {
    state = {
        friends: [],
        requests: [],
    }

    friend = new FriendService();

    componentDidMount() {
        this.friend.get(Session.getId())
            .then(res => {
                if (res.data) {
                    let friends = [];
                    let requests = [];
                    res.data.map(friend => {
                        console.log(friend);
                        if (+friend.status === 0) {
                            requests.push(friend);
                        } else {
                            friends.push(friend);
                        }
                    });
                    this.setState({friends: friends, requests: requests});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        return (
        <div className="friend">
            <FriendList friends = {this.state.friends}/>
            <RightSide requests = {this.state.requests}/>
        </div>
        );
    }
}
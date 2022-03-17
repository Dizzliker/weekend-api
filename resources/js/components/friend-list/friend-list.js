import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FriendService } from '../../services/Friend';
import Session from '../../services/Session';

export default class FriendList extends Component {
    state = {
        friends: [],
    };
    friend = new FriendService();

    componentDidMount() {
        this.friend.get(Session.getId())
            .then(res => {
                if (res.data) {
                    this.setState({friends: res.data});
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    render() {
        const friendList = this.state.friends.map(friend => {
            return (
                <div className="friend__user" key={friend.user_id}>
                    <div className="friend__user-info">
                        <div className="friend__user-ava">
                            <Link to={`/profile/${friend.user_id}`}>
                                <img src={friend.avatar} className="ava-60" alt="User avatar" />
                            </Link>
                        </div>
                        <div className="friend__user-name">
                            <Link to={`/profile/${friend.user_id}`}>
                                <span className="username">{friend.name} {friend.surname}</span>
                            </Link>
                            <span className="online-status">{friend.online}</span>
                        </div>
                    </div>
                    <div className="friend__user-actions">
                        <a href="#">
                            <img src="../images/message.svg" alt="Send message" />
                        </a>
                        <div className="kebab">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="friend__friend-list flex_column ai_center">
                <div className="friend__search-container">
                    <div className="search-box">
                        <input type="text" className="input-search" placeholder="Search" />
                        <img src="../images/search.svg" className="icon-search" alt="Search" />
                    </div> 
                </div>
                <div className="friend__users-container">
                    {friendList}
                </div>
            </div>
        );
    }
}
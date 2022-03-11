import React, { Component } from 'react';

export default class FriendList extends Component {
    state = {
        friends: [
            {
                avatar: '../images/Ava.jpg',
                username: 'Kirill Sabaev',
                online: 'Was online 1 hours ago',

            },
            {
                avatar: '../images/Ava.jpg',
                username: 'Elena Sabaeva',
                online: 'Was online 2 hours ago',

            }
        ],
    };

    render() {
        const friendList = this.state.friends.map(friend => {
            return (
                <div className="friend__user">
                    <div className="friend__user-info">
                        <div className="friend__user-ava">
                            <a href="#">
                                <img src={friend.avatar} className="ava-60" alt="User avatar" />
                            </a>
                        </div>
                        <div className="friend__user-name">
                            <a href="#">
                                <span className="username">{friend.username}</span>
                            </a>
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
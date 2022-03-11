import React, { Component } from 'react';
import User from '../../services/User';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    user = new User;

    componentDidMount() {
        this.user.getAll()
        .then(users => {
            console.log(users);
            this.setState({users: users.data});
        })
        .catch(error => {
            console.warn(error);
        })
    }

    render() {
        const userList = this.state.users.map(user => {
            return (
                <div className="friend__user">
                    <div className="friend__user-info">
                        <div className="friend__user-ava">
                            <a href="#">
                                <img src={user.avatar} className="ava-60" alt="User avatar" />
                            </a>
                        </div>
                        <div className="friend__user-name">
                            <a href="#">
                                <span className="username">{user.name} {user.surname}</span>
                            </a>
                            <span className="online-status">{user.online}</span>
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
                    {userList}
                </div>
            </div>
        );
    }
}
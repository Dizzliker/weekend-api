import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import User from '../../services/User';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    user = new User();

    componentDidMount() {
        this.user.getAll()
            .then(res => {
                if (res.users) {
                    this.setState({users: res.users});
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    render() {
        const {users} = this.state;
        const userList = users.length > 0 ? users.map(user => {
            return (
                <div className="friend__user" key={user.user_id}>
                    <div className="friend__user-info">
                        <div className="friend__user-ava">
                            <Link to={`/profile/${user.user_id}`}>
                                <img src={user.avatar} className="ava-60" alt="User avatar" />
                            </Link>
                        </div>
                        <div className="friend__user-name">
                            <Link to={`/profile/${user.user_id}`}>
                                <span className="username">{user.name} {user.surname}</span>
                            </Link>
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
        }) : null;

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
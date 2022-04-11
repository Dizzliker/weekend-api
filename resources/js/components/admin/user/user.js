import React, { Component } from 'react';
import User from '../../../services/User';
import { Link } from 'react-router-dom';
import PopupEdit from './popup/popup-edit';
import PopupDelete from './popup/popup-delete';
import PopupBan from './popup/popup-ban';
import RightSide from '../right-side/right-side';

export default class AdminUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: false,
            popupBan: false,
            popupEdit: false,
            popupDelete: false,
            users: [],
            currentUser: {},
        };
        this.user = new User();
    }

    updateUsers = () => {
        this.user.getAll()
        .then(res => {
            if (res.users) {
                this.setState({users: res.users});
            }
        })
        .catch(error => {
            console.warn(error);
        });
    }

    componentDidMount() {
        this.updateUsers();
    }

    componentDidUpdate() {
        if (this.state.reload) {
            this.setState({reload: false});
            this.updateUsers();
        }
    }

    unban = (user_id) => {
        this.user.unban(user_id)
            .then(res => {
                if (res.success) {
                    this.setState({reload: true});
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    openPopupBan = (user) => {
        this.setState({popupBan: true, currentUser: user});
    }

    openPopupEdit = (user) => {
        this.setState({popupEdit: true, currentUser: user});
    }

    openPopupDelete = (user) => {
        this.setState({popupDelete: true, currentUser: user});
    }

    render() {
        const {users} = this.state;
        const userList = users.length > 0 ? users.map(user => {
            const {user_id, name, surname, avatar, online, is_banned} = user;
            return (
                <div className="friend__user" key={user_id}>
                    <div className="friend__user-info">
                        <div className="friend__user-ava">
                            <Link to={`/profile/${user_id}`}>
                                <img src={avatar} className="ava-60" alt="User avatar" />
                            </Link>
                        </div>
                        <div className="friend__user-name">
                            <Link to={`/profile/${user_id}`}>
                                <span className="username">{name} {surname}</span>
                            </Link>
                            <span className="online-status">{online}</span>
                        </div>
                    </div>
                    <div className="friend__user-actions">
                        {is_banned ? 
                        <button type="button" class="btn" onClick={() => {this.unban(user_id)}}>Unban</button> :
                        <button type="button" class="btn" onClick={() => {this.openPopupBan(user)}}>Ban</button>}
                        <img src="/images/edit.svg" onClick={() => {this.openPopupEdit(user)}} alt="Edit user info" title="Edit user information" className='cp'/>
                        <img src="/images/close.svg" onClick={() => {this.openPopupDelete(user)}} alt="Delete user" title="Delete user" className='cp'/>
                    </div>
                </div>
            );
        }) : null;
        const {popupBan, popupEdit, popupDelete, currentUser} = this.state; 

        return (
            <>
            {popupBan && <PopupBan user = {currentUser} onClose={() => {this.setState({popupBan: false})}}/>}
            {popupEdit && <PopupEdit user_id = {currentUser.user_id} onClose={() => {this.setState({popupEdit: false})}}/>}
            {popupDelete && <PopupDelete user = {currentUser} onClose={() => {this.setState({popupDelete: false})}}/>}
            <div className="friend">
                <div className="friend__friend-list flex_column ai_center">
                    <h1>All users</h1>
                    <div className="friend__users-container">
                        {userList}
                    </div>
                </div>
                <RightSide />
            </div>
            </>  
        );
    }
}
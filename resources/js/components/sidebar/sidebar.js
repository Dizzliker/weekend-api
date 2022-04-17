import React, { Component } from 'react';
import Menu from '../menu';
import { Link } from 'react-router-dom';
import Player from './player';
import Cookie from '../../services/Cookie';
import {ProfileService} from '../../services/Profile';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.profile = new ProfileService();
    }

    logout = () => {
        this.profile.logout()
            .then(res => {
                if (res) {
                    Cookie.deleteToken();
                    location.href = location.origin + '/';
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    render() {
        const {id, name, surname, avatar} = this.props.user;

        return (
        <>
        <div className="sidebar flex_column ai_center">
            <div className="sidebar__logo">
                <img src="../images/logo.svg" alt="" />
            </div>

            <div className="sidebar__user-container flex jc_space-between">
                <div className="flex ai_center">
                    <div className="sidebar__user-ava">
                        <Link to={`/profile/${id}`}>
                            <img src={avatar} className="ava-50" alt="Your profile" />
                        </Link>
                    </div>

                    <div className="sidebar__user-info flex_column">
                        <Link to={`/profile/${id}`}>
                            <h2 className="username">{name} {surname}</h2>
                        </Link>
                        <span className="sidebar__my-profile">My profile</span>
                    </div>
                </div>

                <div className="sidebar__user-actions flex_center_space-between">
                    <img src="../images/settings.svg" alt="Settings" className="icon icon-settings" />
                    <img src="../images/logout.svg" alt="Logout" onClick={this.logout} className="icon icon-logout" title="logout"/>
                </div>
            </div>

            <Menu countFriendRequests = {this.props.countFriendRequests}
                  countMessages = {this.props.countMessages}/>

            <Player />
        </div>
        </>
        );
    }
}
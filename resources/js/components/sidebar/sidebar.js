import React, { Component } from 'react';
import Menu from '../menu';
import { Link } from 'react-router-dom';
import Session from '../../services/Session';
import { ProfileService } from '../../services/Profile';
import Spinner from '../spinner';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: {},
        };
        this.profile = new ProfileService();
    }

    componentDidMount() {
        this.profile.get(Session.getId())
            .then(res => {
                if (res.data) {
                    this.setState({user: res.data, loading: false});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    logout = () => {
        this.profile.logout()
            .then(res => {
                if (res) {
                    location.href = location.origin + '/';
                    Session.clear();
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    render() {
        const {loading} = this.state;
        const {user_id, name, surname, avatar} = this.state.user;

        return (
        <>
        {loading && <Spinner />}
        <div className="sidebar flex_column ai_center">
            <div className="sidebar__logo">
                <img src="../images/logo.svg" alt="" />
            </div>

            <div className="sidebar__user-container flex ai_center">
                <div className="sidebar__user-ava">
                    <Link to={`/profile/${user_id}`}>
                        <img src={avatar} className="ava-50" alt="Your profile" />
                    </Link>
                </div>

                <div className="sidebar__user-info flex_column">
                    <Link to={`/profile/${user_id}`}>
                        <h2 className="username">{name} {surname}</h2>
                    </Link>
                    <span className="sidebar__my-profile">My profile</span>
                </div>

                <div className="sidebar__user-actions flex jc_space-between">
                    <a href="#">
                        <img src="../images/settings.svg" alt="Settings" className="icon-settings" />
                    </a>
                    <img src="../images/logout.svg" alt="Logout" onClick={this.logout} className="icon-logout" title="logout"/>
                </div>
            </div>

            <Menu countFriendRequests = {this.props.countFriendRequests}/>

            <div className="sidebar__audio flex_column">
                <input type="range" className="input-range" min="0" max="100" step="1" />
                <div className="sidebar__audio-container flex_center_space-between">
                    <div className="sidebar__audio-info flex ai_center">
                        <div className="sidebar__audio-img">
                            <img src="../images/Audio.jpg" className="sidebar__audio-cover" alt="" />
                        </div>
    
                        <div className="sidebar__track-info flex_column">
                            <span className="sidebar__audio-artist">unxknow</span>
                            <span className="sidebar__audio-name">На корвалоле</span>
                        </div>
                    </div>
    
                    <div className="sidebar__audio-actions flex_center_space-between">
                        <img src="../images/arrow-left.svg" alt="" />
                        <img src="../images/pause.svg" alt="" />
                        <img src="../images/arrow-right.svg" alt="" />
                    </div>
                </div>
                <div className="sidebar__audio-duration flex_column ai_flex-end">
                    <input type="range" className="input-range" min="0" max="100" step="1" />
                    <span className="text-duration">1:49</span>
                </div>
            </div>
        </div>
        </>
        );
    }
}
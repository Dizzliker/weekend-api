import React, { Component } from 'react';
import {ProfileService} from '../../services/Profile';
import Session from '../../services/Session';
import Popup from '../popup/popup';
import Spinner from '../spinner';
import PostForm from './post-list/post-form';
import {FriendService} from '../../services/Friend';
import PopupEditAva from './popup-edit-ava/popup-edit-ava';
import InfoItem from './info-item/info-item';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profile: [],
            messages: [],
            reload: false,
            popupAddFriend: false,
            popupEditAva: false,
        }
        this.user = new ProfileService();
        this.friend = new FriendService();
    }
    
    getFormData() {
        let formData = new FormData();
        formData.append('user_id', Session.getId());
        formData.append('friend_id', this.props.user_id);
        return formData;
    }

    sendRequest = () => {
        this.friend.sendRequest(this.getFormData())
            .then(res => {
                if (res.messages) {
                   this.setState({messages: res.messages, popupAddFriend: true});
                } else if (res.success) {
                    this.setState({messages: ['Friend request sent']});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    getUserInfo = (user_id) => {
        this.user.get(user_id)
            .then(info => {
               console.log(info.data);
                this.setState({profile: info.data, loading: false});
            })
            .catch(error => {
                console.error(error);
            });
    }

    getCountFriends = (user_id) => {
        this.friend.getCountFriends(user_id)
            .then(res => {
                if (res.count) {
                    this.setState({personalInfo: {countFriends: res.count}});
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    componentDidMount() {
        const {user_id} = this.props;
        this.getUserInfo(user_id);
    }

    componentDidUpdate(prevProps) {
        const {user_id} = this.props;
        if (this.state.reload || user_id != prevProps.user_id) {
            this.setState({loading: true, popupEditAva: false, reload: false});
            this.getUserInfo(user_id);
        }
    }

    render() {
        const {name, surname, avatar, count_friends, count_photos} = this.state.profile;
        const {loading, messages, popupAddFriend, popupEditAva} = this.state;

        return(
            <>
            {loading && <Spinner />}
            {popupAddFriend &&
            <Popup onClose = {() => this.setState({popupAddFriend: false})}>
                {messages[0]}
            </Popup>}
            {popupEditAva && <PopupEditAva onClose={() => this.setState({popupEditAva: false})} 
            afterImgLoaded={() => {this.setState({reload: true})}}></PopupEditAva>}
            <div className="profile flex_column ai_flex-start">
            <div className="profile__user-container flex">
                <div className="profile__user-avatar flex_center_center">
                    <span className="link-btn__left-circle">
                        <span className="left-circle flex ai_center">
                            <img src="../images/message.svg" className="icon-msg" alt="Send message" />
                            <img src="../images/left-circle.svg" className="icon-circle" alt="" />
                        </span>
                    </span>
                    <div className="profile__avatar">
                        <div className="profile__edit-ava flex_center_center" onClick={() => {this.setState({popupEditAva: true})}}>
                            <span>Click to edit avatar</span>
                        </div>
                        <img src={avatar} className="avatar-img" alt="User avatar" />
                    </div>
                    <span className="link-btn__right-circle" onClick={this.sendRequest}>
                        <span className="right-circle flex_center_flex-end">
                            <img src="../images/friends.svg" className="icon-friend" alt="" />
                            <img src="../images/right-circle.svg" className="icon-circle" alt="" />
                        </span>
                    </span>
                </div>
                <div className="profile__user-info">
                    <div className="profile__name-container flex_center_space-between">
                        <h1 className="profile__username">{name} {surname}</h1>
                        <div className="online-status flex_center_space-between">
                            <div className="online-circle"></div>
                            <span className="online-text">Online</span>
                        </div>
                    </div>
                    <div className="profile__user-status flex ai_center">
                        <span className="profile__status-text">Dead inside</span>
                    </div>
                    <div className="profile__more-info flex_center_space-between">
                        <div className="profile__list-info flex_column jc_space-between">
                            <div className="profile__list-item">
                                <span className="profile__item-caption">
                                    Sex:
                                </span>
                                <div className="profile__item-value">
                                    <span className="profile__item-text">Male</span>
                                </div>
                            </div>
                            <div className="profile__list-item">
                                <span className="profile__item-caption">
                                    Birthday:
                                </span>
                                <div className="profile__item-value">
                                    <span className="profile__item-text">18.11.02</span>
                                </div>
                            </div>
                            <div className="profile__list-item">
                                <span className="profile__item-caption">
                                    Language:
                                </span>
                                <div className="profile__item-value">
                                    <span className="profile__item-text">Russian</span>
                                </div>
                            </div>
                            <div className="profile__list-item">
                                <span className="profile__item-caption">
                                    Relationship:
                                </span>
                                <div className="profile__item-value">
                                    <span className="profile__item-text">None</span>
                                </div>
                            </div>
                        </div>
                        <div className="profile__personal-info flex jc_space-between">
                            <InfoItem img="/images/friends(purple).svg" text="Friends" count={count_friends}/>
                            <InfoItem img="/images/music(purple).svg"   text="Music"   count={0}/>
                            <InfoItem img="/images/photo(purple).svg"   text="Photos"  count={count_photos}/>
                            <InfoItem img="/images/video(purple).svg"   text="Videos"  count={0}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posts">
                <PostForm user_id = {this.props.user_id} user = {this.state.profile} />
            </div>
        </div> 
            </>
        );
    }
}

export default Profile;
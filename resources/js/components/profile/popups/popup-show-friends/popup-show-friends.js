import React, { Component } from "react";
import Popup from "../../../popup";
import {FriendService} from '../../../../services/Friend';
import Spinner from "../../../spinner";
import { Link } from "react-router-dom";

export default class PopupShowFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            loading: true,
        };
        this.friend = new FriendService();
    }

    updateFriendList(user_id) {
        this.friend.get(user_id)
            .then(res => {
                if (res.friends) {
                    this.setState({friends: res.friends, loading: false});
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    componentDidMount() {
        const {url_user_id} = this.props;
        if (url_user_id) {
            this.updateFriendList(url_user_id);
        }
    }

    componentDidUpdate(prevProps) {
        const {url_user_id} = this.props;
        if (prevProps.url_user_id != url_user_id) {
            this.updateFriendList(url_user_id);
        }
    }

    render() {
        const {friends} = this.state;
        const friendList = friends.length > 0 ? friends.map(friend => {
            return (
                <div className="flex_column ai_center jc_center" key={friend.user_id}>
                    <Link to={`/profile/${friend.user_id}`} onClick={this.props.onClose}>
                        <img src={friend.avatar} className="ava-70" alt="Avatar"/>
                    </Link>
                    <Link to={`/profile/${friend.user_id}`} onClick={this.props.onClose}>
                        {friend.name} {friend.surname}
                    </Link>
                </div>
            );
        }) : null;

        return (
            <>
            {this.state.loading && <Spinner></Spinner>}
            <Popup onClose={this.props.onClose}>
                <div className="popup__show-friends flex jc_space-between fw_wrap">
                    {friendList}
                </div>
            </Popup>
            </>
        );
    }
}
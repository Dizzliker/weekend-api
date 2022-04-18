import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FriendService } from '../../services/Friend';
import Spinner from '../spinner';

export default class FriendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            loading: true,
            friends: [],
            text: '',
        };
        this.friend = new FriendService();
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    updateFriendList = () => {
        if (this.props.cur_user_id) {
            this.friend.get(this.props.cur_user_id)
                .then(res => {
                    if (res.data) {
                        this.setState({friends: res.data, loading: false});
                    }
                })
                .catch(error => {
                    console.warn(error);
                });
        }
    }
    
    componentDidMount() {
        this.updateFriendList();
    }

    componentDidUpdate(prevProps) {
        if (this.props.reload || prevProps.cur_user_id != this.props.cur_user_id) {
            this.setState({loading: true});
            this.props.afterReload();
            this.updateFriendList();
        }
    }

    getFormData = () => {
        let formData = new FormData();
        formData.append("user_id", this.props.cur_user_id);
        formData.append("text", this.state.text);
        return formData;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    searchFriends = (event) => {
        this.handleInputChange(event);
        if (this.state.text.trim() != '') {
            setTimeout(() => {
                this.friend.searchFriends(this.getFormData())
                    .then(res => {
                        if (res.friends) {
                            this.setState({friends: res.friends, message: ''});
                        } else if (res.message_not_found) {
                            this.setState({message: res.message_not_found});
                        }
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }, 1000);
        }
    }

    render() {
        const {friends, loading, message} = this.state;
        const friendList = friends.length > 0 ? friends.map(friend => {
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
                        <Link to={`/messages/${friend.user_id}`}>
                            <img src="../images/message.svg" alt="Send message" />
                        </Link>
                        <div className="kebab">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            );
        }) : <h3>No friends found</h3>;

        return (
            <>
            {loading && <Spinner />}
            <div className="friend__friend-list flex_column ai_center">
                <div className="friend__search-container">
                    <div className="search-box">
                        <input type="text" value={this.state.text} onChange={(event) => {this.searchFriends(event)}} name="text" className="input-search" placeholder="Search" />
                        <img src="../images/search.svg" className="icon-search" alt="Search" />
                    </div> 
                </div>
                <div className="friend__users-container">
                    {message && 
                    <div className="error-box">
                        {message}
                    </div>}
                    {friendList}
                </div>
            </div>
            </>
        );
    }
}
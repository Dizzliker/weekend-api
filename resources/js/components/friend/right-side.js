import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FriendService } from '../../services/Friend';
import Session from '../../services/Session';

export default class RightSide extends Component {
    state = {
        requests: [],
    };
    request = new FriendService();

    componentDidMount() {
        this.request.getRequests(Session.getId())
            .then(res => {
                if (res) {
                    this.setState({requests: res.requests, countRequests: res.count});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    addFriend = (e) => {
        e.preventDefault();
        this.request.addFriend(e.target.querySelector('.request_id').value)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        const {requests} = this.state;
        const requestList = requests.map(request => {
            return (
                <li className="friend__user-request" key={request.request_id}>
                    <div className="friend__user-info flex ai_center">
                        <Link to={`/profile/${request.user_id}`} className="link-ava">
                            <img src={request.avatar} className="ava-50" alt="User avatar" />
                        </Link>
                        <Link to={`/profile/${request.user_id}`}> 
                            <span className="username">{request.name} {request.surname}</span>
                        </Link>
                    </div>
                    <div className="friend__request-actions">
                        <form onSubmit={this.addFriend} method="get">
                            <input type="hidden" className="request_id" value={request.request_id} />
                            <button className="btn-add-friend">
                                <img src="../images/plus.svg" className="icon-plus" alt="Add friend" />
                            </button>
                        </form>
                        
                        <div className="kebab gray">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <div className="friend__right-side flex_column ai_center">
                <h3 className="friend__header">User actions</h3>

                <Link to="/users" className="link link-all-users">
                    <span className="friend__all-users">All users</span>
                </Link>

                <div className="friend__friend-request">
                    <div className="friend__request-header flex_center_space-between">
                        <div className="friend__count-request">
                            +{this.props.countRequests}
                        </div>
                        <span className="title">Friend requests</span>
                        <img src="../images/arrow-down.svg" className="icon-toggle-arrow" alt="Show all requests" />
                    </div>
                    <ul className="friend__request-list">
                        {requestList}
                    </ul>
                </div>
            </div>
        );
    }
}
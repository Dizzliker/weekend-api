import React, { Component } from 'react';
import { AdminService } from '../../services/Admin';
import './admin.css';
import RightSide from './right-side/right-side';
import { Link } from 'react-router-dom';

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counts: {},
        };
        this.admin = new AdminService();
    }
   
    componentDidMount() {
        this.admin.getCounts()
            .then(res => {
                if (res.counts) {
                    this.setState({counts: res.counts});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        const {count_users, count_posts, count_audios} = this.state.counts;

        return (
            <>
                <div className="adminpanel">
                    <h1>Admin panel</h1>

                    <div className="adminpanel__categories">
                        <Link to="/admin/users">
                            <div className="adminpanel__category">
                                <img src="images/friends(purple).svg"/>
                                <span>Users</span>
                                <span>{count_users}</span>
                            </div>
                        </Link>
                        <Link to="/admin/posts">
                            <div className="adminpanel__category">
                                <img src="images/news.svg"/>
                                <span>Posts</span>
                                <span>{count_posts}</span>
                            </div>
                        </Link>
                        <div className="adminpanel__category">
                            <img src="images/music(purple).svg"/>
                            <span>Audios</span>
                            <span>{count_audios}</span>
                        </div>
                    </div>
                </div>
                <RightSide />
            </>
        );
    }
}
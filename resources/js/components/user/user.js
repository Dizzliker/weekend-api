import React, { Component } from 'react';
import UserList from '../user-list';
import RightSide from '../friend/right-side';

export default class User extends Component {
    render() {
        return (
        <div className="friend">
            <UserList />
            <RightSide />
        </div>  
        );
    }
}
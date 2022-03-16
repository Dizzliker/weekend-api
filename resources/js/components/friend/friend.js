import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import FriendList from '../friend-list/friend-list';
import UserList from '../user-list';
import RightSide from './right-side';

export default class Friend extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
        <div className="friend">
            <FriendList />
            <RightSide />
        </div>
        );
    }
}
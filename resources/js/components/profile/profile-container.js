import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './profile';

const ProfileContainer = () => {
    const {id} = useParams();

    return (
        <Profile user_id = {id} />
    );
}

export default ProfileContainer;
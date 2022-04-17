import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from './profile';

const ProfileContainer = ({user}) => {
    const {id} = useParams();

    return (
        <Profile user={user} user_id = {id} />
    );
}

export default ProfileContainer;
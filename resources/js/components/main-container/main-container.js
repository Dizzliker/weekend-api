import React from 'react';
import Main from '../main/main';

const MainContainer = ({user, countFriendRequests, countMessages}) => {
    return <Main user={user} countFriendRequests={countFriendRequests} countMessages={countMessages}/>
}

export default MainContainer;
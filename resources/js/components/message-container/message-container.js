import React from "react";
import { useParams } from "react-router-dom";
import Message from "../message/message";

const MessageContainer = ({usersOnline, cur_user_id, newMessagesData, countMessages, minusReadedMessages}) => {
    const {id} = useParams();
    return <Message cur_user_id={cur_user_id} 
                    url_user_id = {id} 
                    usersOnline = {usersOnline}
                    minusReadedMessages={minusReadedMessages}
                    countMessages = {countMessages}
                    newMessagesData = {newMessagesData}/>;
}

export default MessageContainer;
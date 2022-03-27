import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Message from "../message/message";

const MessageContainer = () => {
    const {id} = useParams();
    return <Message user_id = {id}/>;
}

export default MessageContainer;
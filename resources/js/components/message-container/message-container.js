import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Message from "../message/message";

const MessageContainer = ({countMessages}) => {
    const {id} = useParams();
    return <Message user_id = {id} countMessages = {countMessages}/>;
}

export default MessageContainer;
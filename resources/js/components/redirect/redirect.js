import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../spinner";

export default class Redirect extends Component {
    state = {
        loading: true
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cur_user_id != this.props.cur_user_id) {
            this.setState({loading: false});
        }
    }

    render() {
        return <Navigate to={`/profile/${this.props.cur_user_id}`} />
    }
}
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../spinner";

export default class Redirect extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            loading: true,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user.id != this.props.user.id) {
            this.setState({loading: false});
        }
    }

    render() {
        return this.state.loading ? <Spinner /> : <Navigate to={`/profile/${this.props.user.id}`} />
    }
}
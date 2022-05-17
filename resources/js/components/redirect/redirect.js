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

    componentDidMount() {
        if (this.props.cur_user_id) {
            this.setState({loading: false});
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cur_user_id != this.props.cur_user_id) {
            this.setState({loading: false});
        }
    }

    render() {
        return this.state.loading ? <Spinner /> : <Navigate to={`/profile/${this.props.cur_user_id}`} />
    }
}
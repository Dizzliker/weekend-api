import React, { Component } from 'react';

export default class Spinner extends Component {
    render() {
        return (
        <div className="loader-wrapper">
            <div className="loader-box">
                <div className="loader"></div>
            </div>
        </div>
        );
    }
}
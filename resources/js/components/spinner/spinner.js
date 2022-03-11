import React, { Component } from 'react';

export default class Spinner extends Component {
    render() {
        return (
        <div class="loader-wrapper">
            <div class="loader-box">
                <div class="loader"></div>
            </div>
        </div>
        );
    }
}
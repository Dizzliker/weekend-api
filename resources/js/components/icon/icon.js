import React, { Component } from "react";

export default class Icon extends Component {
    render() {
        const {src, alt} = this.props;
        return (
            // <object type="image/svg+xml" data={src} >
                <img className="sidebar__item-icon" src={src} alt={alt} />
            // </object>
        );
    }
}
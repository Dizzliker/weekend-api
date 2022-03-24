import React, { Component } from "react";

export default class InfoItem extends Component {
    render() {
        const {img, text, count} = this.props;

        return (
            <div className="profile__info-item">
                    <a href="#" className="profile__item-link">
                        <img src={img} className="icon-item" alt="Videos" />
                        <span className="item-text">{text}</span>
                        <span className="item-count">{count}</span>
                    </a>
             </div>
        );
    }
}
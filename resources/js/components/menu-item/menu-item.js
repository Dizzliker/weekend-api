import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuItem extends Component {
    render() {
        const {img, text, link, count} = this.props;

        return(
            <li className="sidebar__menu-item flex ai_center jc_space-between">
                <div className="sidebar__item-container">
                    <img className="sidebar__item-icon" src={img} alt="" />
                    <Link to={link} className="sidebar__item-link"><span className="sidebar__item-text">{text}</span></Link>
                </div>
                {count ? 
                <div className="sidebar__count-body">
                    <span className="sidebar__item-count">+{count}</span>
                </div>
                : null}
            </li>
        );
    }
}
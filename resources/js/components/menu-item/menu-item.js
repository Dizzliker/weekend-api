import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MenuItem extends Component {
    render() {
        const {img, text, link} = this.props;

        return(
            <li className="sidebar__menu-item flex ai_center">
                <img className="sidebar__item-icon" src={img} alt="" />
                <Link to={link} className="sidebar__item-link"><span className="sidebar__item-text">{text}</span></Link>
            </li>
        );
    }
}
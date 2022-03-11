import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RightSide extends Component {
    render() {
        return (
            <div className="friend__right-side flex_column ai_center">
                <h3 className="friend__header">User actions</h3>

                <Link to="/users" className="link link-all-users">
                    <span className="friend__all-users">All users</span>
                </Link>

                <div className="friend__friend-request">
                    <div className="friend__request-header flex_center_space-between">
                        <div className="friend__count-request">
                            +5
                        </div>
                        <span className="title">Friend requests</span>
                        <img src="../images/arrow-down.svg" className="icon-toggle-arrow" alt="Show all requests" />
                    </div>
                    <ul className="friend__request-list">
                        <li className="friend__user-request">
                            <div className="friend__user-info flex ai_center">
                                <a href="#" className="link-ava">
                                    <img src="../images/Ava.jpg" className="ava-50" alt="User avatar" />
                                </a>
                                <a href="#">
                                    <span className="username">Kirill Sabaev</span>
                                </a>
                            </div>
                            <div className="friend__request-actions">
                                <a href="#">
                                    <img src="../images/plus.svg" className="icon-plus" alt="Add friend" />
                                </a>
                                <div className="kebab gray">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </li>
                        <li className="friend__user-request">
                            <div className="friend__user-info">
                                <a href="#" className="link-ava">
                                    <img src="../images/Ava.jpg" className="ava-50" alt="User avatar" />
                                </a>
                                <a href="#">
                                    <span className="username">Kirill Sabaev</span>
                                </a>
                            </div>
                            <div className="friend__request-actions">
                                <a href="#">
                                    <img src="../images/plus.svg" className="icon-plus" alt="Add friend" />
                                </a>
                                <div className="kebab gray">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </li>
                        <li className="friend__user-request">
                            <div className="friend__user-info">
                                <a href="#" className="link-ava">
                                    <img src="../images/Ava.jpg" className="ava-50" alt="User avatar" />
                                </a>
                                <a href="#">
                                    <span className="username">Kirill Sabaev</span>
                                </a>
                            </div>
                            <div className="friend__request-actions">
                                <a href="#">
                                    <img src="../images/plus.svg" className="icon-plus" alt="Add friend" />
                                </a>
                                <div className="kebab gray">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </li>
                        <li className="friend__user-request">
                            <div className="friend__user-info">
                                <a href="#" className="link-ava">
                                    <img src="../images/Ava.jpg" className="ava-50" alt="User avatar" />
                                </a>
                                <a href="#">
                                    <span className="username">Kirill Sabaev</span>
                                </a>
                            </div>
                            <div className="friend__request-actions">
                                <a href="#">
                                    <img src="../images/plus.svg" className="icon-plus" alt="Add friend" />
                                </a>
                                <div className="kebab gray">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </li>
                        <li className="friend__user-request">
                            <div className="friend__user-info">
                                <a href="#" className="link-ava">
                                    <img src="../images/Ava.jpg" className="ava-50" alt="User avatar" />
                                </a>
                                <a href="#">
                                    <span className="username">Kirill Sabaev</span>
                                </a>
                            </div>
                            <div className="friend__request-actions">
                                <a href="#">
                                    <img src="../images/plus.svg" className="icon-plus" alt="Add friend" />
                                </a>
                                <div className="kebab gray">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
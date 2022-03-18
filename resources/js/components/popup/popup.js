import React, { Component } from 'react';
import './popup.css';

export default class Popup extends Component {
    render() {
        return (
            <div className="popup__wrapper">
                <div className="popup flex ai_center jc_center">
                    <div className="popup__header flex ai_center jc_center">
                        <div className="popup__logo">
                            <img src="../images/logo.svg" className="logo" alt="Weekend"/>
                        </div>
                        <div className="popup__close" title="close">
                            <img src="../images/close.svg" onClick={() => {this.props.onClose()}} className="icon-close" alt="Close"/>
                        </div>
                    </div>
                    <div className="popup__body flex_column ai_center jc_center">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
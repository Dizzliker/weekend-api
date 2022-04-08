import React, { Component } from 'react';
import User from '../../../../services/User';
import Popup from '../../../popup';

export default class PopupDelete extends Component {
    user = new User();

    deleteUser = (event) => {
        event.preventDefault();
        this.user.delete(this.props.user.user_id)
            .then(res => {
                console.log(res);
            })
    }

    render() {
        const {name, surname} = this.props.user;
        return (
            <Popup onClose={this.props.onClose}>
                <form onSubmit={this.deleteUser} method="get" className='flex_column'>
                    <span>Are you sure want to delete user {name} {surname}?</span>
                    <button className="btn-auth">Delete</button>
                </form>
            </Popup>
        );
    }
}
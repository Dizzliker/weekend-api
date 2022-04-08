import React, { Component } from 'react';
import User from '../../../../services/User';
import Popup from '../../../popup';

export default class PopupEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
        this.user = new User();
    }

    componentDidMount() {
        this.user.get(this.props.user_id)
            .then(res => {
                this.setState({user: res.user});
            })
            .catch(error => {
                console.warn(error);
            });
    }

    editUserInfo = () => {

    }

    render() {
        const {email, name, surname} = this.state.user;

        return (
            <Popup onClose = {this.props.onClose}>
                <form onSubmit={this.editUserInfo} className="login__form flex_column" method="post">
                    <input type="email" name="email" placeholder="E-mail" className="input email" value={email} onChange={this.handleInputChange}/>
                    <input type="text" name="name" placeholder="First name" className="input" value={name} onChange={this.handleInputChange}/>
                    <input type="text" name="surname" placeholder="Surname" className="input" value={surname} onChange={this.handleInputChange}/>
                    <button className="btn-auth" name="btn-login">Edit info</button>
                </form>
            </Popup>
        );
    }
}
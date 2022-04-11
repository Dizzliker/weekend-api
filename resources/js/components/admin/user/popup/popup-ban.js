import React, {Component} from 'react';
import User from '../../../../services/User';
import Popup from '../../../popup';

export default class PopupBan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.user = new User();
    }

    banUser = (event) => {
        event.preventDefault();
        this.user.ban(this.props.user.user_id)
            .then(res => {
                if (res) {
                    console.log(res);
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        const {name, surname} = this.props.user;
        return (
            <Popup onClose={this.props.onClose}>
                <form onSubmit={this.banUser} method="get" className='flex_column'>
                    <span>Are you sure want to ban user {name} {surname}?</span>
                    <button className="btn-auth">Ban</button>
                </form>
            </Popup>
        );
    }
}
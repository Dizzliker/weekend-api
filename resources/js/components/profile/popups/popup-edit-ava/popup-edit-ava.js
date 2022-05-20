import React, { Component } from 'react';
import { ProfileService } from '../../../../services/Profile';
import Popup from '../../../popup';

export default class PopupEditAva extends Component {
    constructor(props) {
        super(props);
        this.profile = new ProfileService();
        this.inputImg = React.createRef();
    }

    getFormData = () => {
        let formData = new FormData();
        formData.append("user_id", this.props.cur_user_id);
        formData.append("avatar", this.inputImg.current.files[0]);
        return formData;
    }

    handleImg = (input) => {
        input.preventDefault();
        this.profile.changeAvatar(this.getFormData())
            .then(res => {
                if (res.success) {
                    this.props.afterImgLoaded();
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        return (
            <Popup onClose={this.props.onClose}>
                <form method="post" encType="multipart/form-data">
                    <input type="file" name="avatar" onChange={this.handleImg} ref={this.inputImg} accept="image/*" id="avatar" className="avatar" hidden/>
                    <label htmlFor="avatar">
                        <div className="btn-upload flex_center_center">
                            <img src="../images/img(purple).svg" className="btn-upload__icon" alt="Music"/>
                            <span>Change avatar</span>
                        </div>
                    </label>
                </form>
            </Popup>
        );
    }
}
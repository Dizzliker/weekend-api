import React, { Component } from 'react';
import Audio from '../../../services/Audio';
import Popup from '../../popup';
import './popup-add-music.css';

export default class PopupAddMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: false,
            author: '',
            name: '',
        };
        this.audio = new Audio();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputMp3 = React.createRef();
        this.inputImg = React.createRef();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit = (input) => {
        input.preventDefault();
        const file = this.inputMp3.current.files[0];
        const parts = file.name.split('.');
        const ext = parts.length > 1 ? parts.pop() : '';
        this.setState(
            {
            form: ext.toLowerCase() === 'mp3' ? true : false,
            author: parts[0],
            name: parts[1] && parts[0],
        });
    }

    handleCover = (input) => {
        input.preventDefault();
        const availableExt = ['png', 'jpeg', 'jpg', 'svg'];
        const file = this.inputImg.current.files[0];
        const parts = file.name.split('.');
        const ext = parts.length > 1 ? parts.pop() : '';
        if (availableExt.includes(ext.toLowerCase())) {
            this.setState({previewCover: URL.createObjectURL(file)});
        }
    }

    getFormData = () => {
        const {author, name} = this.state;
        let formData = new FormData();
        formData.append("author", author);
        formData.append("name", name);
        formData.append("cover", this.inputMp3.current.files[0].duration);
    }

    addAudio = () => {
        this.audio.addAudio()
            .then(res => {

            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        const {form, author, name, previewCover} = this.state;

        return(
        <Popup onClose={this.props.onClose}>
            <form onSubmit={this.addAudio} method="post" encType="multipart/form-data">
                <input type="file" ref={this.inputMp3} onChange={this.handleSubmit} name="audio" className="audio" id="audio"
                hidden/>
                <label htmlFor="audio" className="upload_audio">
                    <div className="btn-upload flex_center_center">
                        <img src="../images/music(purple).svg" className="btn-upload__icon" alt="Music"/>
                        <span>Choose mp3 file</span>
                    </div>
                </label>
                {form &&
                <div className="flex_column">
                    <input type="text" name="author" onChange={this.handleInputChange} value={author} className="input" placeholder="Author" />
                    <input type="text" name="name" onChange={this.handleInputChange} value={name} className="input" placeholder="Audio name"/>
                    <input type="file" name="cover" onChange={this.handleCover} ref={this.inputImg} accept="image/*" id="cover" className="cover" hidden/>
                    <label htmlFor="cover">
                        <div className="btn-upload flex_center_center">
                            <img src="../images/img(purple).svg" className="btn-upload__icon" alt="Music"/>
                            <span>Cover for your audio</span>
                        </div>
                    </label>
                    <div className={previewCover && "flex"}>
                        <span>Cover preview:</span>
                        <img src={previewCover} className="preview-cover" alt="Cover audio"/>
                    </div>
                    <button className="btn-auth">Add audio</button>
                </div>              
                }
            </form>
        </Popup>
        );
    }
}
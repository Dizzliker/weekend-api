import React, { Component } from "react";
import { GalleryService } from "../../../services/Gallery";

export default class AdminPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
        }
        this.photo = new GalleryService();
    }

    onDeletePhoto = (photoId) => {
        this.photo.delete(photoId)
            .then(res => {
                if (res.success) {
                    this.updatePhotoList();
                }
            });
    }

    updatePhotoList = () => {
        this.photo.getAll()
            .then(res => {
                if (res.photos) {
                    this.setState({photos: res.photos});
                }
            })
    }

    componentDidMount() {
        this.updatePhotoList();
    }

    render() {
        const photoList = this.state.photos.length > 0 ? this.state.photos.map(photo => {
            return (
                <div className="gallery__photo-body" key={photo.id} style={{marginBottom: 15+'px'}}>
                    <div className="cp" style={{width: 100+'%', position: 'relative'}} onClick={() => {this.onDeletePhoto(photo.id)}}>
                        <img src="/images/close.svg" alt="Delete photo" style={{position: 'absolute', right: 0, bottom: 0}} title="Click to delete photo"/>
                    </div>
                    <img src={photo.img} alt="Photo" className="gallery__photo" />
                </div>
            );
        }): <div className="flex_center_center">Don't have any photos yet</div>;

        return (
            <div className="gallery">
                <h1 className="gallery__header">All photos</h1>

                <div className="gallery__photos flex jc_space-between">
                    {photoList}
                </div>
            </div>
        );
    }
}
import React, { Component } from "react";
import {GalleryService} from "../../../../services/Gallery";
import Spinner from "../../../spinner";
import { Link } from "react-router-dom";
import Popup from "../../../popup";
import './popup-show-gallery.css';

export default class PopupShowGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: [],
            currentPhoto: {},
            loading: true,
            indexPhoto: 0,
        };
        
        this.galleryService = new GalleryService();
    }

    toggleLikeByPhotoId = (photoId, like) => {
        this.setState(state => {
            const gallery = state.gallery.map((photo) => {
              if (photo.id == photoId) {
                  if (photo.user_id == this.props.cur_user_id) {
                    photo.i_like = like;
                  }
                  like ? photo.likes++ : photo.likes--;
              }
              return photo;
            });
            let photo = Object.assign(state.currentPhoto);
            photo.i_like = like;
            return {gallery, currentPhoto: photo};
          });
    }

    onLikePhoto = () => {
        const {id} = this.state.currentPhoto;
        this.galleryService.likePhoto(id)
            .then(res => {
                if (res.success) {
                    this.toggleLikeByPhotoId(id, true);
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    onUnlikePhoto = () => {
        const {id} = this.state.currentPhoto;
        this.galleryService.unLikePhoto(id)
            .then(res => {
                if (res.success) {
                    this.toggleLikeByPhotoId(id, false);
                }
            })
            .catch(error => {
                console.warn(error);
            })
    }

    nextPhoto = () => {
        const {indexPhoto, gallery} = this.state;
        let currentIndex = indexPhoto+1;
        if (currentIndex === gallery.length) {
            currentIndex = 0;
        }
        this.setState({
            currentPhoto: gallery[currentIndex],
            indexPhoto: currentIndex,
        });
    }

    prevPhoto = () => {
        const {indexPhoto, gallery} = this.state;
        let currentIndex = indexPhoto-1;
        if (currentIndex < 0) {
            currentIndex = 0;
        }
        this.setState({
            currentPhoto: gallery[currentIndex],
            indexPhoto: currentIndex,
        });
    }

    componentDidMount() {
        const {url_user_id} = this.props;
        if (url_user_id) {
            this.galleryService.getProfileGallery(url_user_id)
                .then(res => {
                    if (res.gallery) {
                        this.setState({
                            gallery: res.gallery, 
                            loading: false, 
                            currentPhoto: res.gallery[this.state.indexPhoto],
                        });
                    }
                })
                .catch(error => {
                    console.warn(error);
                })
        }
    }

    render() {
        const {currentPhoto, loading} = this.state;

        return (
            currentPhoto ? 
            <div className="popup_gallery-wrapper popup__wrapper flex_center_center">
                {loading && <Spinner />}
                <div className="popup__gallery-container flex ai_center">
                    <div className="popup__control popup__arrow-left flex_center_center" onClick={() => {this.prevPhoto()}}popup__photo-container>
                        <img src="/images/arrow-left.svg"/>
                    </div>
                    <div className="popup__main flex_center_center" key={currentPhoto.id}>
                    <div className="popup__photo-container flex_center_center">
                        <img src={currentPhoto.img} alt="Photo" className="popup__photo"/>
                    </div>
                    <div className="popup__right-side flex_column jc_space-between">
                        <div className="popup__header flex_column">
                            {/* Инфо о пользователе */}
                            <div className="popup__header-user flex_center_space-between">
                                <div className="popup__author-container flex ai_center">
                                    <Link to={`/profile/${currentPhoto.user_id}`} className="popup__ava-link">
                                        <img src={currentPhoto.avatar} className="ava-50"/>
                                    </Link>
                                    <div className="popup__author-info flex_column">
                                        <Link to={`/profile/${currentPhoto.user_id}`} className="link">
                                            {currentPhoto.name} {currentPhoto.surname}
                                        </Link>
                                        <span className="popup__created_at">{currentPhoto.created_at}</span>
                                    </div>
                                </div>
                                <div className="kebab">
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                    <div className="circle"></div>
                                </div>
                            </div>
                            {/* Лайки, репосты, комменты */}
                            <div className="flex_center_space-between">
                                <span className="cp flex popup__action link" onClick={currentPhoto.i_like ? () => {this.onUnlikePhoto()} 
                                                                                                          : () => {this.onLikePhoto()}}>
                                    <img src={currentPhoto.i_like ? "/images/like(purple).svg" : "/images/like.svg"} alt="Like" className="popup__action-icon"/>
                                    <span className="popup__action-text">{currentPhoto.likes}</span>
                                </span>
                                <span className="cp flex popup__action link">
                                    <img src="/images/repost.svg" alt="Repost" className="popup__action-icon"/>
                                    <span className="popup__action-text">{currentPhoto.reposts}</span>
                                </span>
                                <span className="cp flex popup__action link">
                                    <img src="/images/comment.svg" alt="Comment" className="popup__action-icon"/>
                                    <span className="popup__action-text">{currentPhoto.comments}</span>
                                </span>
                            </div>
                        </div>
                        <div className="popup__body flex_column jc_flex-start">
                            
                        </div>
                        <form className="popup__form-add-comment flex jc_space-around">
                            <input type="hidden" name="photo_id" value={currentPhoto.id}/>
                            <textarea type="text" className="popup__form-input" name="text" placeholder="Your comment"/>
                            <span className="popup__form-btn flex_center_center">
                                <img src="/images/icon-send(purple).svg" className="icon-send" alt="Send"/>
                            </span>
                        </form>
                    </div>
                </div>
                    <div className="popup__right-actions flex_column">
                        <div className="popup__control popup__close flex_center_center" onClick={() => {this.props.onClose()}}>
                            <img src="/images/close.svg" alt="Close"/>
                        </div>
                        <div className="popup__control popup__arrow-right flex_center_center" onClick={() => {this.nextPhoto()}}>
                            <img src="/images/arrow-right.svg"/>
                        </div>
                    </div>
                </div>
            </div> : 
            <Popup onClose={this.props.onClose}>The user has no photos</Popup>
        );
    }
}
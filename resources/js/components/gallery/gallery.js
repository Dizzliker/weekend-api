import React, {Component} from 'react';
import GalleryService from '../../services/Gallery';
import { ProfileService } from '../../services/Profile';
import Session from '../../services/Session';
import Spinner from '../spinner';

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            reload: false,
            gallery: [], 
        };
        this.galleryService = new GalleryService();
        this.profile = new ProfileService();
        this.inputImg = React.createRef();
    }

    getFormData = (i) => {
        let formData = new FormData();
        formData.append("user_id", Session.getId());
        formData.append("img[]", JSON.stringify(i));
        return formData;
    }

    updateGallery = () => {
        this.galleryService.get(Session.getId())
            .then(res => {
                if (res.gallery) {
                    this.setState({gallery: res.gallery, loading: false});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    componentDidMount() {
        this.updateGallery();
    }

    componentDidUpdate() {
        if (this.state.reload) {
            this.setState({reload: false});
            this.updateGallery();
        }
    }

    addPhotos = (input) => {
        input.preventDefault();
        const files = this.inputImg.current.files;
        if (files.length > 0) {
            this.galleryService.addPhotos(this.getFormData())
                .then(res => {
                    if (res.succes) {
                        this.setState({reload: true});
                    }
                })
                .catch(error => {
                    console.warn(error);
                });
            
        }
    }

    handleImg = (input) => {
        input.preventDefault();
        const files = this.inputImg.current.files;
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[0]);
                this.galleryService.addPhotos(this.getFormData(files[i]))
                    .then(res => {
                       if (res) {
                            console.log(res);
                        }
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }
        }
    }

    render() {
        const {gallery, loading} = this.state;
        const photos = gallery.length > 0 ? gallery.map(photo => {
            return (
                <div className="gallery__photo-body" key={photo.id}>
                    <img src={photo.img} alt="Photo" className="gallery__photo" />
                </div>
            );
        }) : <div className="flex_center_center">You don't have any photos yet</div>

        return (
            <>
            {loading && <Spinner />}
            <div className="gallery">
               <h2 className="gallery__header">My photos</h2>
               {/* <form method="post" encType="multipart/form-data">
                <input type="file" ref={this.inputImg} onChange={this.addPhotos} accept="image/*" name="img" className="img" id="img"
                    hidden multiple/>
                    <label htmlFor="img">
                    <div className="btn-upload flex_center_center">
                            <img src="../images/img(purple).svg" className="btn-upload__icon" alt="Img"/>
                            <span>Upload new photos</span>
                        </div>
                    </label>
               </form> */}

               <form method="post" encType="multipart/form-data">
                    <input type="file" name="img" onChange={this.handleImg} ref={this.inputImg} accept="image/*" id="img" className="img" hidden multiple/>
                    <label htmlFor="img">
                        <div className="btn-upload flex_center_center">
                            <img src="../images/img(purple).svg" className="btn-upload__icon" alt="Music"/>
                            <span>Upload new photos</span>
                        </div>
                    </label>
                </form>
               
               <div className="gallery__photos flex jc_space-between">
                    {photos}
               </div>
           </div> 
            </>
        );
    }
}
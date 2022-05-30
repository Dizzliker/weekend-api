import Weekend from './Weekend';

class Gallery extends Weekend {
    get = async (id) => {
        return await this.getData(`/gallery/${id}`);
    }

    getProfileGallery = async (id) => {
        return await this.getData(`/profile/${id}/gallery`);
    }

    likePhoto = async (id) => {
        return await this.getData(`/gallery/${id}/like`);
    }
    
    unLikePhoto = async (id) => {
        return await this.getData(`/gallery/${id}/unlike`);
    }

    addPhotos = async (data) => {
        return await this.postData('/addPhotos', data);
    }
}

export {Gallery as GalleryService}
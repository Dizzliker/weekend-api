import Weekend from './Weekend';

class Gallery extends Weekend {
    get = async (id) => {
        return await this.getData(`/gallery/${id}`);
    }

    getAll = async () => {
        return await this.getData(`/gallery`);
    }

    delete = async (id) => {
        return await this.getData(`/gallery/${id}/delete`);
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
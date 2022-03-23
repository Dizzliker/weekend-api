import Weekend from './Weekend';

export default class GalleryService extends Weekend {
    get = async (id) => {
        return await this.getData(`/gallery/${id}`);
    }

    addPhotos = async (data) => {
        return await this.postData('/addPhotos', data, true);
    }
}
import Weekend from './Weekend';

export default class Post extends Weekend {
    getUserPosts = async (id) => {
        return await this.getData(`/post/${id}`);
    }

    like = async (id, data) => {
        return await this.postData(`/post/${id}/like`, data, true);
    }

    unlike = async (id, data) => {
        return await this.postData(`/post/${id}/unlike`, data, true);
    }
}
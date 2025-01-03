import Weekend from './Weekend';

class Post extends Weekend {
    getUserPosts = async (id) => {
        return await this.getData(`/post/${id}`);
    }

    getFriendPosts = async () => {
        return await this.getData(`/news`);
    }

    like = async (id, data) => {
        return await this.postData(`/post/${id}/like`, data);
    }

    unlike = async (id, data) => {
        return await this.postData(`/post/${id}/unlike`, data);
    }

    delete = async (id) => {
        return await this.getData(`/post/${id}/delete`);
    }

    // Админка
    getAllPosts = async () => {
        return await this.getData('/getAllPosts');
    }
}

export {Post as PostService};
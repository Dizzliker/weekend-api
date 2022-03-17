import Weekend from './Weekend';

export default class Post extends Weekend {
    getUserPosts = async (id) => {
        return await this.getData(`/post/${id}`);
    }
}
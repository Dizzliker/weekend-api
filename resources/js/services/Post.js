import Weekend from './Weekend';

export default class Post extends Weekend {
    getUserPosts = async (id) => {
        const posts = await this.getData(`/post/${id}`);
        return posts;
    }
}
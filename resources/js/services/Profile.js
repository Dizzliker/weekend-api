import Weekend from './Weekend';

class Profile extends Weekend {
    get = async (id) => {
        return await this.getData(`/profile/${id}`);
    }

    logout = async () => {
        return await this.postData(`/logout`);
    }
}

export {Profile as ProfileService}
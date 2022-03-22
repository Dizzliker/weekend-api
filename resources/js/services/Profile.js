import Weekend from './Weekend';

class Profile extends Weekend {
    get = async (id) => {
        return await this.getData(`/profile/${id}`);
    }

    changeAvatar = async (data) => {
        return await this.postData(`/changeAvatar`, data, true);
    }

    logout = async () => {
        return await this.postData(`/logout`);
    }
}

export {Profile as ProfileService}
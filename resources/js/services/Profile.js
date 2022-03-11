import Weekend from './Weekend';

class Profile extends Weekend {
    get = async (id) => {
        return await this.getData(`profile/${id}`);
    }

    logout = async () => {
        
    }
}

export {Profile as ProfileService}
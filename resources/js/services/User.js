import Weekend from './Weekend';

export default class User extends Weekend {
    get = async (id) => {
        return await this.getData(`/user/${id}`);
    }

    getAll = async () => {
        return await this.getData('/users');
    }

    delete = async (id) => {
        return await this.getData(`/user/${id}/delete`)
    }
}